
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, MapPin, Shield, HelpCircle } from 'lucide-react';

const Resources = () => {
  return (
    <Layout>
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Resources & Help</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Find support services and information to help victims of gender-based violence
          </p>
        </div>

        <Tabs defaultValue="emergency">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-4">
            <TabsTrigger value="emergency">Emergency Help</TabsTrigger>
            <TabsTrigger value="support">Support Centers</TabsTrigger>
            <TabsTrigger value="legal">Legal Resources</TabsTrigger>
            <TabsTrigger value="education">Educational Materials</TabsTrigger>
          </TabsList>
          
          <TabsContent value="emergency" className="pt-6">
            <div className="bg-safeminor-primary/10 border border-safeminor-primary/20 rounded-lg p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="h-6 w-6 text-red-600" />
                <h2 className="text-2xl font-bold">Emergency Contacts</h2>
              </div>
              <p className="mb-4">
                If you or someone you know is in immediate danger, please contact one of these emergency services:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>National Police Service</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-2">
                      <div className="text-2xl font-bold">999</div>
                      <div className="text-sm text-gray-500">Available 24/7</div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Call Now</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Child Protection Hotline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-2">
                      <div className="text-2xl font-bold">116</div>
                      <div className="text-sm text-gray-500">Toll-free, 24/7</div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Call Now</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Gender Violence Helpline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-2">
                      <div className="text-2xl font-bold">1195</div>
                      <div className="text-sm text-gray-500">Available 24/7</div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Call Now</Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-md">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-amber-500" />
                  <p className="text-amber-800 font-medium">SafeMinor USSD Code: *XXX*YYY#</p>
                </div>
                <p className="mt-2 text-sm text-amber-700">
                  Access SafeMinor services via USSD for emergency reporting even without internet access.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="support" className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Support Centers</h2>
            <p className="mb-6">
              The following centers offer support services for victims of gender-based violence:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-safeminor-primary" />
                    <CardTitle>Nairobi Women's Hospital Gender Violence Recovery Center</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-3">
                    Provides comprehensive medical and psychosocial support to survivors of gender-based violence.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                      <span>Argwings Kodhek Rd, Nairobi</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 text-gray-500 mt-1" />
                      <span>+254 20 2726821</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Details</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-safeminor-primary" />
                    <CardTitle>COVAW (Coalition on Violence Against Women)</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-3">
                    Provides legal aid, counseling, and advocacy for survivors of gender-based violence.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                      <span>Valley Arcade, Gitanga Road, Nairobi</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 text-gray-500 mt-1" />
                      <span>+254 20 804 2000</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Details</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-safeminor-primary" />
                    <CardTitle>GVRC Kenyatta National Hospital</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-3">
                    Provides medical and psychological support to survivors of sexual and gender-based violence.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                      <span>Hospital Road, Nairobi</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 text-gray-500 mt-1" />
                      <span>+254 20 272 6300</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Details</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-safeminor-primary" />
                    <CardTitle>Wangu Kanja Foundation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-3">
                    Supports survivors of sexual violence and advocates for justice and protection.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                      <span>Karen, Nairobi</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 text-gray-500 mt-1" />
                      <span>+254 722 790 404</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Details</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="legal" className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Legal Resources</h2>
            <p className="mb-6">
              Information about your legal rights and resources available for seeking justice:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-safeminor-primary" />
                    <CardTitle>Children's Act</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    The Children's Act provides the legal framework for the care, protection, and maintenance of children in Kenya.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Download PDF</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-safeminor-primary" />
                    <CardTitle>Sexual Offenses Act</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    The Sexual Offenses Act defines various sexual offenses and provides for the protection of all persons from harm.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Download PDF</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-safeminor-primary" />
                    <CardTitle>Prohibition of FGM Act</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    This act prohibits the practice of female genital mutilation and safeguards against violation of a person's physical integrity.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Download PDF</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-safeminor-primary" />
                    <CardTitle>Free Legal Aid</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Information on how to access free legal representation and advice for gender-based violence cases.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Learn More</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="education" className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Educational Resources</h2>
            <p className="mb-6">
              Educational materials about gender-based violence and how to prevent it:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recognizing Signs of Abuse</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Learn how to identify the warning signs of various forms of abuse in children and young adults.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Read Guide</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Community Response Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    A comprehensive guide for communities on how to respond to and prevent gender-based violence.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Download Guide</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>School Safety Program</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Resources for schools to create safe environments and teach students about personal safety.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Access Resources</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Videos & Multimedia</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Educational videos and interactive content on child protection and gender-based violence awareness.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Browse Content</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Survivor Stories</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Anonymous testimonies from survivors that help raise awareness and provide hope to others.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Read Stories</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Parent's Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Information for parents and guardians on how to protect children and promote healthy relationships.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Read Guide</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Resources;
