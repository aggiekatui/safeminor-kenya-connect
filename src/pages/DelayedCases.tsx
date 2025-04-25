
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Clock } from 'lucide-react';

// Mock data for delayed cases
const mockDelayedCases = [
  {
    id: "CASE-001",
    reportDate: "2025-01-15",
    victimName: "Jane Doe",
    county: "Nairobi",
    type: "Physical Abuse",
    daysElapsed: 45,
    status: "Pending Police Response"
  },
  {
    id: "CASE-003",
    reportDate: "2025-02-01",
    victimName: "Mary Johnson",
    county: "Kisumu",
    type: "Child Marriage",
    daysElapsed: 30,
    status: "Awaiting Medical Report"
  },
  {
    id: "CASE-007",
    reportDate: "2025-02-10",
    victimName: "Grace Wanjiku",
    county: "Narok",
    type: "FGM",
    daysElapsed: 25,
    status: "Pending Investigation"
  }
];

const DelayedCases = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCases, setFilteredCases] = useState(mockDelayedCases);

  const handleSearch = () => {
    const filtered = mockDelayedCases.filter(
      (caseItem) =>
        caseItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseItem.victimName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseItem.county.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCases(filtered);
  };

  return (
    <Layout>
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Delayed Cases</h1>
            <p className="text-gray-500 mt-2">Monitor cases requiring immediate attention</p>
          </div>
          <Card className="w-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Delayed Cases</CardTitle>
              <Clock className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredCases.length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end mb-4">
          <div className="flex gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search cases..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Case ID</TableHead>
                  <TableHead>Report Date</TableHead>
                  <TableHead>Victim Name</TableHead>
                  <TableHead>County</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Days Elapsed</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.map((caseItem) => (
                  <TableRow key={caseItem.id}>
                    <TableCell className="font-medium">{caseItem.id}</TableCell>
                    <TableCell>{caseItem.reportDate}</TableCell>
                    <TableCell>{caseItem.victimName}</TableCell>
                    <TableCell>{caseItem.county}</TableCell>
                    <TableCell>{caseItem.type}</TableCell>
                    <TableCell>
                      <span className="text-red-500 font-semibold">{caseItem.daysElapsed} days</span>
                    </TableCell>
                    <TableCell>{caseItem.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DelayedCases;
