
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const userRoles = [
  { id: 'reporter', name: 'Reporter', description: 'Regular users who report cases' },
  { id: 'medical', name: 'Medical Officer', description: 'Healthcare providers' },
  { id: 'police', name: 'Police Officer', description: 'Law enforcement' }
];

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  idNumber: z.string().min(5, {
    message: "ID number must be at least 5 characters.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Confirm password must be at least 8 characters.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Registration = () => {
  const [userType, setUserType] = useState('reporter');
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      idNumber: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Registration attempt:", { userType, ...values });
    
    toast({
      title: "Registration Successful",
      description: `You've registered as a ${userRoles.find(role => role.id === userType)?.name}`,
    });

    // In a real application, you would send this data to your backend
    // and redirect to login or verification page
  }

  return (
    <Layout>
      <div className="py-16 min-h-[80vh] flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md px-4">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-safeminor-primary text-white flex items-center justify-center">
              <Shield className="h-6 w-6" />
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Create an Account</CardTitle>
              <CardDescription className="text-center">
                Register to access SafeMinor Kenya services
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs onValueChange={setUserType} value={userType} className="mb-6">
                <TabsList className="grid grid-cols-1 sm:grid-cols-3">
                  {userRoles.map(role => (
                    <TabsTrigger key={role.id} value={role.id}>
                      {role.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {userRoles.map(role => (
                  <TabsContent key={role.id} value={role.id}>
                    <div className="text-sm text-gray-500 mb-4">
                      {role.description} - Please provide your details to register.
                    </div>
                  </TabsContent>
                ))}
              </Tabs>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="idNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ID Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your ID number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Enter your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Create a password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Confirm your password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full bg-safeminor-primary hover:bg-safeminor-secondary">
                    Register
                  </Button>
                </form>
              </Form>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-2">
              <div className="text-sm text-center text-gray-500">
                Already have an account?{' '}
                <Link to="/login" className="text-safeminor-primary hover:underline">
                  Login here
                </Link>
              </div>
              
              <div className="text-xs text-center text-gray-500">
                By registering, you agree to our{' '}
                <Link to="/terms" className="text-safeminor-primary hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-safeminor-primary hover:underline">
                  Privacy Policy
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Registration;
