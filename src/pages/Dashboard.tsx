
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import CaseReportChart from '@/components/dashboard/CaseReportChart';
import CountyStatCard from '@/components/dashboard/CountyStatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const mockCasesByCounty = [
  { name: "Bungoma", value: 33 },
  { name: "Homabay", value: 33 },
  { name: "Migori", value: 30 },
  { name: "Narok", value: 27 },
  { name: "Kisumu", value: 24 },
  { name: "Siaya", value: 23 },
];

const mockCasesByType = [
  { name: "Physical Abuse", value: 42 },
  { name: "Sexual Abuse", value: 28 },
  { name: "FGM", value: 16 },
  { name: "Child Marriage", value: 12 },
  { name: "Neglect", value: 8 },
  { name: "Other", value: 4 },
];

type CaseType = {
  id: string;
  date: string;
  victimName: string;
  county: string;
  type: string;
  status: "New" | "In Progress" | "Resolved";
};

const mockCases: CaseType[] = [
  { 
    id: "CASE-001", 
    date: "2025-04-12", 
    victimName: "Jane Doe", 
    county: "Nairobi", 
    type: "Physical Abuse", 
    status: "New" 
  },
  { 
    id: "CASE-002", 
    date: "2025-04-10", 
    victimName: "John Smith", 
    county: "Mombasa", 
    type: "Sexual Abuse", 
    status: "In Progress" 
  },
  { 
    id: "CASE-003", 
    date: "2025-04-08", 
    victimName: "Mary Johnson", 
    county: "Kisumu", 
    type: "Child Marriage", 
    status: "New" 
  },
  { 
    id: "CASE-004", 
    date: "2025-04-05", 
    victimName: "Grace Wanjiku", 
    county: "Narok", 
    type: "FGM", 
    status: "In Progress" 
  },
  { 
    id: "CASE-005", 
    date: "2025-04-03", 
    victimName: "Peter Ochieng", 
    county: "Homabay", 
    type: "Neglect", 
    status: "Resolved" 
  },
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCases, setFilteredCases] = useState<CaseType[]>(mockCases);

  const handleSearch = () => {
    const filtered = mockCases.filter(
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500 mt-2">Monitor and track GBV cases across Kenya</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
              <div className="h-4 w-4 bg-safeminor-primary rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">231</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
              <div className="h-4 w-4 bg-amber-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">Being processed currently</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved Cases</CardTitle>
              <div className="h-4 w-4 bg-green-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142</div>
              <p className="text-xs text-muted-foreground">62% resolution rate</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <CaseReportChart 
            data={mockCasesByCounty} 
            title="Cases by County"
            description="Distribution of reported cases across counties"
          />
          <CaseReportChart 
            data={mockCasesByType} 
            title="Cases by Type"
            description="Breakdown of different types of reported abuse"
          />
        </div>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <h2 className="text-2xl font-bold">Recent Cases</h2>
            <div className="w-full sm:w-auto flex gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search cases..."
                  className="pl-8 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch}>Search</Button>
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Cases</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="progress">In Progress</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="rounded-md border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50 border-b">
                        <th className="py-3 px-4 text-left font-medium">Case ID</th>
                        <th className="py-3 px-4 text-left font-medium">Date Reported</th>
                        <th className="py-3 px-4 text-left font-medium">Victim Name</th>
                        <th className="py-3 px-4 text-left font-medium">County</th>
                        <th className="py-3 px-4 text-left font-medium">Type</th>
                        <th className="py-3 px-4 text-left font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCases.length > 0 ? (
                        filteredCases.map((caseItem) => (
                          <tr key={caseItem.id} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4">{caseItem.id}</td>
                            <td className="py-3 px-4">{caseItem.date}</td>
                            <td className="py-3 px-4">{caseItem.victimName}</td>
                            <td className="py-3 px-4">{caseItem.county}</td>
                            <td className="py-3 px-4">{caseItem.type}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`inline-block px-2 py-1 text-xs rounded-full ${
                                  caseItem.status === "New"
                                    ? "bg-blue-100 text-blue-800"
                                    : caseItem.status === "In Progress"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {caseItem.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="py-6 px-4 text-center text-gray-500">
                            No cases found matching your search.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="new">
              <div className="rounded-md border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50 border-b">
                        <th className="py-3 px-4 text-left font-medium">Case ID</th>
                        <th className="py-3 px-4 text-left font-medium">Date Reported</th>
                        <th className="py-3 px-4 text-left font-medium">Victim Name</th>
                        <th className="py-3 px-4 text-left font-medium">County</th>
                        <th className="py-3 px-4 text-left font-medium">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCases
                        .filter((caseItem) => caseItem.status === "New")
                        .map((caseItem) => (
                          <tr key={caseItem.id} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4">{caseItem.id}</td>
                            <td className="py-3 px-4">{caseItem.date}</td>
                            <td className="py-3 px-4">{caseItem.victimName}</td>
                            <td className="py-3 px-4">{caseItem.county}</td>
                            <td className="py-3 px-4">{caseItem.type}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="progress">
              <div className="rounded-md border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50 border-b">
                        <th className="py-3 px-4 text-left font-medium">Case ID</th>
                        <th className="py-3 px-4 text-left font-medium">Date Reported</th>
                        <th className="py-3 px-4 text-left font-medium">Victim Name</th>
                        <th className="py-3 px-4 text-left font-medium">County</th>
                        <th className="py-3 px-4 text-left font-medium">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCases
                        .filter((caseItem) => caseItem.status === "In Progress")
                        .map((caseItem) => (
                          <tr key={caseItem.id} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4">{caseItem.id}</td>
                            <td className="py-3 px-4">{caseItem.date}</td>
                            <td className="py-3 px-4">{caseItem.victimName}</td>
                            <td className="py-3 px-4">{caseItem.county}</td>
                            <td className="py-3 px-4">{caseItem.type}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="resolved">
              <div className="rounded-md border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50 border-b">
                        <th className="py-3 px-4 text-left font-medium">Case ID</th>
                        <th className="py-3 px-4 text-left font-medium">Date Reported</th>
                        <th className="py-3 px-4 text-left font-medium">Victim Name</th>
                        <th className="py-3 px-4 text-left font-medium">County</th>
                        <th className="py-3 px-4 text-left font-medium">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCases
                        .filter((caseItem) => caseItem.status === "Resolved")
                        .map((caseItem) => (
                          <tr key={caseItem.id} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4">{caseItem.id}</td>
                            <td className="py-3 px-4">{caseItem.date}</td>
                            <td className="py-3 px-4">{caseItem.victimName}</td>
                            <td className="py-3 px-4">{caseItem.county}</td>
                            <td className="py-3 px-4">{caseItem.type}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Most Affected Counties</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockCasesByCounty.slice(0, 4).map((county, index) => (
              <CountyStatCard
                key={county.name}
                county={county.name}
                percentage={county.value}
                rank={index + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
