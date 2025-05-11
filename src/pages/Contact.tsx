
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const { toast } = useToast();

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
