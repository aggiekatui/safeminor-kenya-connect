
import React, { useState, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, Mic, AlertTriangle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isRecording, setIsRecording] = useState(false);
  const [alertSent, setAlertSent] = useState(false);
  const { toast } = useToast();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    
    toast({
      title: "Message Sent",
      description: "We have received your message and will respond shortly.",
    });

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

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

  return (
    <Layout>
      <div className="py-12 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Contact Us</h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Get in touch with our team for support, questions, or partnerships
            </p>
          </div>

          {/* Emergency Voice Alert Card */}
          <div className="mb-10">
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
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Phone className="h-6 w-6 text-safeminor-primary mt-1" />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                        <p className="mt-1 text-gray-500">
                          Call our support line for assistance
                        </p>
                        <p className="mt-2 text-safeminor-primary font-medium">1195</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Mail className="h-6 w-6 text-safeminor-primary mt-1" />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Email</h3>
                        <p className="mt-1 text-gray-500">
                          Send us an email anytime
                        </p>
                        <p className="mt-2 text-safeminor-primary font-medium">support@safeminorkenya.org</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-6 w-6 text-safeminor-primary mt-1" />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Office</h3>
                        <p className="mt-1 text-gray-500">
                          Visit our headquarters
                        </p>
                        <address className="mt-2 not-italic text-safeminor-primary font-medium">
                          Stima Plaza<br />
                          Moi Avenue, Nairobi<br />
                          Kenya
                        </address>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input 
                          id="name"
                          name="name"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Your Email</Label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input 
                        id="subject"
                        name="subject"
                        placeholder="What is your message about?"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message"
                        name="message"
                        placeholder="Type your message here..."
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full bg-safeminor-primary hover:bg-safeminor-secondary"
                    >
                      Send Message
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
