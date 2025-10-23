'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useBulkCreateCandidates } from '@/lib/hooks/use-candidates';
import type { Candidate } from '@/lib/types';
import { AlertCircle, CheckCircle, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Use Pick to derive from Candidate type for better type safety
type ParsedCandidate = Pick<Candidate, 'name' | 'email' | 'appliedFor' | 'phone' | 'source'> & {
  isValid: boolean;
  errors: string[];
};

export function BulkUploadForm() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [parsedCandidates, setParsedCandidates] = useState<ParsedCandidate[]>([]);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [createdCount, setCreatedCount] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const bulkCreateCandidates = useBulkCreateCandidates();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      parseCSV(selectedFile);
    } else {
      alert('Please select a valid CSV file');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'text/csv') {
      setFile(droppedFile);
      parseCSV(droppedFile);
    } else {
      alert('Please drop a valid CSV file');
    }
  };

  const parseCSV = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n').filter((line) => line.trim());

      // Skip header row
      const dataLines = lines.slice(1);

      const candidates: ParsedCandidate[] = dataLines.map((line) => {
        const [name, email, appliedFor, phone, source] = line
          .split(',')
          .map((field) => field.trim());

        const errors: string[] = [];
        if (!name || name.length < 2) errors.push('Name must be at least 2 characters');
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Invalid email');
        if (!appliedFor) errors.push('Position is required');

        return {
          name: name || '',
          email: email || '',
          appliedFor: appliedFor || '',
          phone: phone || '',
          source: source || 'CSV Import',
          isValid: errors.length === 0,
          errors,
        };
      });

      setParsedCandidates(candidates);
      setUploadStatus('idle');
    };

    reader.readAsText(file);
  };

  const handleUpload = async () => {
    const validCandidates = parsedCandidates.filter((c) => c.isValid);

    if (validCandidates.length === 0) {
      alert('No valid candidates to upload');
      return;
    }

    try {
      const result = await bulkCreateCandidates.mutateAsync(validCandidates);
      setCreatedCount(result.created);
      setUploadStatus('success');

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/candidates');
      }, 2000);
    } catch (error) {
      console.error('Failed to upload candidates:', error);
      setUploadStatus('error');
    }
  };

  const downloadTemplate = () => {
    const template =
      'name,email,appliedFor,phone,source\nJohn Doe,john@example.com,Software Engineer,+1234567890,LinkedIn\nJane Smith,jane@example.com,Product Manager,,Referral';
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'candidate-template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const validCount = parsedCandidates.filter((c) => c.isValid).length;
  const invalidCount = parsedCandidates.length - validCount;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* File Upload */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label
                  htmlFor="csv-upload"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                    isDragging ? 'border-primary bg-primary/10' : 'hover:bg-muted/50'
                  }`}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload
                      className={`w-8 h-8 mb-2 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`}
                    />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">CSV file only</p>
                  </div>
                  <input
                    id="csv-upload"
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>

            {file && (
              <div className="text-sm text-muted-foreground">
                Selected file: <span className="font-medium text-foreground">{file.name}</span>
              </div>
            )}

            <Button variant="outline" onClick={downloadTemplate} className="w-full">
              Download CSV Template
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      {parsedCandidates.length > 0 && uploadStatus === 'idle' && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Preview</h3>
                <div className="text-sm text-muted-foreground">
                  {validCount} valid, {invalidCount} invalid
                </div>
              </div>

              <div className="rounded-md border max-h-96 overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Source</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {parsedCandidates.map((candidate, index) => (
                      <TableRow key={`${candidate.email}-${index}`}>
                        <TableCell>
                          {candidate.isValid ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <div title={candidate.errors.join(', ')}>
                              <AlertCircle className="h-5 w-5 text-red-500" />
                            </div>
                          )}
                        </TableCell>
                        <TableCell className={!candidate.isValid ? 'text-red-500' : ''}>
                          {candidate.name}
                        </TableCell>
                        <TableCell className={!candidate.isValid ? 'text-red-500' : ''}>
                          {candidate.email}
                        </TableCell>
                        <TableCell className={!candidate.isValid ? 'text-red-500' : ''}>
                          {candidate.appliedFor}
                        </TableCell>
                        <TableCell>{candidate.phone || '-'}</TableCell>
                        <TableCell>{candidate.source}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Button
                onClick={handleUpload}
                disabled={validCount === 0 || bulkCreateCandidates.isPending}
                className="w-full"
              >
                {bulkCreateCandidates.isPending
                  ? 'Uploading...'
                  : `Upload ${validCount} Candidate${validCount !== 1 ? 's' : ''}`}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Success Message */}
      {uploadStatus === 'success' && (
        <Card className="border-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-green-500">
              <CheckCircle className="h-6 w-6" />
              <div>
                <p className="font-semibold">Upload Successful!</p>
                <p className="text-sm text-muted-foreground">
                  {createdCount} candidate{createdCount !== 1 ? 's' : ''} added. Redirecting...
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Message */}
      {uploadStatus === 'error' && (
        <Card className="border-red-500">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-red-500">
              <AlertCircle className="h-6 w-6" />
              <div>
                <p className="font-semibold">Upload Failed</p>
                <p className="text-sm text-muted-foreground">Please try again later</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
