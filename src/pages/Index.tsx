import React, { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import StatSection from '../components/home/StatSection';
import FeatureSection from '../components/home/FeatureSection';
import UssdSection from '../components/home/UssdSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, AlertTriangle, Shield, FileText, Users, Database } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock data for demonstration purposes
const mockMedicalReports = [
  { id: "MR001", patientId: "P123", hospital: "Kenyatta National Hospital", date: "2023-05-10", status: "Complete" },
  { id: "MR002", patientId: "P456", hospital: "Nairobi Hospital", date: "2023-05-12", status: "Pending" },
  { id: "MR003", patientId: "P789", hospital: "Aga Khan Hospital", date: "2023-05-15", status: "Complete" },
];

const mockPoliceStatements = [
  { obNumber: "OB001/05/2023", victimName: "Jane Doe", policeStation: "Central Police Station", date: "2023-05-10", officer: "Sgt. Kamau" },
  { obNumber: "OB002/05/2023", victimName: "Mary Smith", policeStation: "Kilimani Police Station", date: "2023-05-11", officer: "Cpl. Omondi" },
  { obNumber: "OB003/05/2023", victimName: "Ann Wanjiku", policeStation: "Karen Police Station", date: "2023-05-13", officer: "Sgt. Kiprop" },
];

const mockVictimRecords = [
  { id: "V001", name: "Jane Doe", age: 28, location: "Nairobi", caseType: "Domestic Violence", status: "Open" },
  { id: "V002", name: "Mary Smith", age: 35, location: "Mombasa", caseType: "Sexual Assault", status: "Under Investigation" },
  { id: "V003", name: "Ann Wanjiku", age: 24, location: "Kisumu", caseType: "Child Abuse", status: "Closed" },
];

const Index = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [alertSent, setAlertSent] = useState(false);
  const { toast } = useToast();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [currentAdminView, setCurrentAdminView] = useState<'medical' | 'police' | 'victims'>('medical');
  const [isAdmin, setIsAdmin] = useState(false); // In a real app, this would come from auth state

  const startVoiceAlert = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      setIsRecording(true);
      toast({
        title: "Emergency Mode Activated",
        description: "Recording your voice. An alert will be sent automatically.",
        variant: "destructive",
      });

      // Create a new MediaRecorder instance
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      // Array to store audio data
      const audioChunks: BlobPart[] = [];
      
      // Listen for dataavailable event
      mediaRecorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });
      
      // Listen for stop event
      mediaRecorder.addEventListener('stop', () => {
        // Stop all audio tracks
        stream.getTracks().forEach(track => track.stop());
        
        // Process the recorded audio (in a real app, you would send this to a server)
        processEmergencyAlert();
      });
      
      // Start recording
      mediaRecorder.start();
      
      // Stop recording after 5 seconds (adjust as needed)
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          mediaRecorderRef.current.stop();
          setIsRecording(false);
        }
      }, 5000);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setIsRecording(false);
      toast({
        title: "Microphone Access Denied",
        description: "Please allow microphone access to use the emergency voice alert feature.",
        variant: "destructive",
      });
    }
  };

  const cancelVoiceAlert = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      
      // Stop all tracks from the stream
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    }
    
    setIsRecording(false);
    toast({
      title: "Emergency Alert Cancelled",
      description: "Voice recording stopped. No alert was sent.",
    });
  };

  const processEmergencyAlert = () => {
    // In a real implementation, this would:
    // 1. Use the device's location to find nearest police/medical facilities
    // 2. Send alerts to those facilities
    // 3. Generate and send email receipts to authorities
    console.log("Processing emergency alert");
    
    // Simulate successful alert
    setAlertSent(true);
    toast({
      title: "Emergency Alert Sent",
      description: "Alert sent to nearest police station and medical facility. Help is on the way.",
      variant: "destructive",
    });
    
    // Reset after 10 seconds
    setTimeout(() => {
      setAlertSent(false);
    }, 10000);
  };

  // Function to simulate admin login - in a real app, this would be part of authentication
  const handleAdminAccess = () => {
    // This is just for demo purposes
    // In a real app, this would verify credentials against Supabase or another backend
    toast({
      title: "Administrator Access Granted",
      description: "You now have view-only access to sensitive data.",
    });
    setIsAdmin(true);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs defaultValue="home" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="emergency" className="bg-red-100 hover:bg-red-200 data-[state=active]:bg-red-200">
              <AlertTriangle className="mr-2 h-4 w-4" /> Emergency Alert
            </TabsTrigger>
            <TabsTrigger value="admin" className="bg-blue-100 hover:bg-blue-200 data-[state=active]:bg-blue-200">
              <Shield className="mr-2 h-4 w-4" /> Administrator
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="home">
            <Hero />
            <StatSection />
            <FeatureSection />
            <UssdSection />
          </TabsContent>
          
          <TabsContent value="emergency">
            <Card className={`border-2 ${alertSent ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
              <CardHeader>
                <CardTitle className="flex items-center text-red-700">
                  <AlertTriangle className="mr-2 h-6 w-6" />
                  Emergency Voice Alert
                </CardTitle>
                <CardDescription>
                  In immediate danger? Use your voice to send an automatic alert to the nearest help.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center space-y-4">
                  {alertSent ? (
                    <div className="text-center p-4 bg-green-100 rounded-md">
                      <p className="font-bold text-green-800">Alert Successfully Sent</p>
                      <p className="text-green-700">Emergency services have been notified. Stay safe.</p>
                    </div>
                  ) : (
                    <p className="text-center text-red-600">
                      Press and hold the button below to record a voice alert. This will immediately notify nearby police and medical services of your emergency.
                    </p>
                  )}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                    <Button 
                      size="lg"
                      disabled={isRecording || alertSent}
                      onClick={startVoiceAlert}
                      className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto flex items-center justify-center gap-2"
                    >
                      <Mic className="h-5 w-5" />
                      {alertSent ? "Alert Sent" : "Start Emergency Voice Alert"}
                    </Button>
                    
                    {isRecording && (
                      <Button 
                        variant="outline"
                        size="lg"
                        onClick={cancelVoiceAlert}
                        className="border-red-600 text-red-600 hover:bg-red-50 w-full sm:w-auto"
                      >
                        Cancel Alert
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-red-100 text-red-700 text-sm">
                <p>This feature uses your location and microphone to send help to your current position.</p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-6 w-6 text-blue-700" />
                  Administrator Portal
                </CardTitle>
                <CardDescription>
                  View-only access to case records, medical reports, police statements, and victim data.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isAdmin ? (
                  <div className="flex flex-col items-center justify-center space-y-4 py-6">
                    <p className="text-center">
                      This section is restricted to authorized personnel only (Police OCS and System Administrators).
                    </p>
                    <Button 
                      onClick={handleAdminAccess}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Authenticate for Access
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-x-2">
                        <Button 
                          variant={currentAdminView === 'medical' ? 'default' : 'outline'}
                          onClick={() => setCurrentAdminView('medical')}
                          className="flex items-center gap-1"
                        >
                          <FileText className="h-4 w-4" />
                          Medical Reports
                        </Button>
                        <Button 
                          variant={currentAdminView === 'police' ? 'default' : 'outline'}
                          onClick={() => setCurrentAdminView('police')}
                          className="flex items-center gap-1"
                        >
                          <Shield className="h-4 w-4" />
                          Police Statements
                        </Button>
                        <Button 
                          variant={currentAdminView === 'victims' ? 'default' : 'outline'}
                          onClick={() => setCurrentAdminView('victims')}
                          className="flex items-center gap-1"
                        >
                          <Users className="h-4 w-4" />
                          Victim Records
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold">Note:</span> Read-only access
                      </p>
                    </div>
                    
                    <div className="rounded-md border">
                      {currentAdminView === 'medical' && (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Report ID</TableHead>
                              <TableHead>Patient ID</TableHead>
                              <TableHead>Hospital</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {mockMedicalReports.map((report) => (
                              <TableRow key={report.id}>
                                <TableCell className="font-medium">{report.id}</TableCell>
                                <TableCell>{report.patientId}</TableCell>
                                <TableCell>{report.hospital}</TableCell>
                                <TableCell>{report.date}</TableCell>
                                <TableCell>
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    report.status === 'Complete' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {report.status}
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                      
                      {currentAdminView === 'police' && (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>OB Number</TableHead>
                              <TableHead>Victim Name</TableHead>
                              <TableHead>Police Station</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Officer</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {mockPoliceStatements.map((statement) => (
                              <TableRow key={statement.obNumber}>
                                <TableCell className="font-medium">{statement.obNumber}</TableCell>
                                <TableCell>{statement.victimName}</TableCell>
                                <TableCell>{statement.policeStation}</TableCell>
                                <TableCell>{statement.date}</TableCell>
                                <TableCell>{statement.officer}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                      
                      {currentAdminView === 'victims' && (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>ID</TableHead>
                              <TableHead>Name</TableHead>
                              <TableHead>Age</TableHead>
                              <TableHead>Location</TableHead>
                              <TableHead>Case Type</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {mockVictimRecords.map((victim) => (
                              <TableRow key={victim.id}>
                                <TableCell className="font-medium">{victim.id}</TableCell>
                                <TableCell>{victim.name}</TableCell>
                                <TableCell>{victim.age}</TableCell>
                                <TableCell>{victim.location}</TableCell>
                                <TableCell>{victim.caseType}</TableCell>
                                <TableCell>
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    victim.status === 'Closed' ? 'bg-green-100 text-green-800' : 
                                    victim.status === 'Open' ? 'bg-blue-100 text-blue-800' : 
                                    'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {victim.status}
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </div>
                    
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-md">
                      <p className="text-sm text-amber-800">
                        <strong>Security Notice:</strong> All actions in this portal are logged and monitored. 
                        The data presented is sensitive and confidential.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <p className="text-sm text-muted-foreground">
                  Accessing this data requires proper authorization
                </p>
                {isAdmin && (
                  <Button variant="outline" onClick={() => setIsAdmin(false)}>
                    Log Out
                  </Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Index;
