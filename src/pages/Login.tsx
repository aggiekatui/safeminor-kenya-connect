
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

const userRoles = [
  { id: 'reporter', name: 'Reporter', description: 'Regular users who report cases' },
  { id: 'medical', name: 'Medical Officer', description: 'Healthcare providers' },
  { id: 'police', name: 'Police Officer', description: 'Law enforcement' },
  { id: 'admin', name: 'Administrator', description: 'System administrators' }
];

const Login = () => {
  const [userType, setUserType] = useState('reporter');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Login attempt:", { userType, email, password });
    
    toast({
      title: "Login Successful",
      description: `You've logged in as a ${userRoles.find(role => role.id === userType)?.name}`,
    });
  };

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
              <CardTitle className="text-center">Login to SafeMinor Kenya</CardTitle>
              <CardDescription className="text-center">
                Access the system based on your role
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs onValueChange={setUserType} value={userType} className="mb-6">
                <TabsList className="grid grid-cols-2 sm:grid-cols-4">
                  {userRoles.map(role => (
                    <TabsTrigger key={role.id} value={role.id}>
                      {role.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {userRoles.map(role => (
                  <TabsContent key={role.id} value={role.id}>
                    <div className="text-sm text-gray-500 mb-4">
                      {role.description} - Enter your credentials to login.
                    </div>
                  </TabsContent>
                ))}
              </Tabs>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email or ID Number</Label>
                  <Input
                    id="email"
                    placeholder="Enter your email or ID"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link 
                      to="/forgot-password" 
                      className="text-xs text-safeminor-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full bg-safeminor-primary hover:bg-safeminor-secondary">
                  Login
                </Button>
              </form>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-2">
              <div className="text-sm text-center text-gray-500">
                Don't have an account?{' '}
                <Link to="/register" className="text-safeminor-primary hover:underline">
                  Register here
                </Link>
              </div>
              
              <div className="text-xs text-center text-gray-500">
                By logging in, you agree to our{' '}
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

export default Login;
