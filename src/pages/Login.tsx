import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const userRoles = [
  { id: 'reporter', name: 'Reporter', description: 'Regular users who report cases' },
  { id: 'medical', name: 'Medical Officer', description: 'Healthcare providers' },
  { id: 'police', name: 'Police Officer', description: 'Law enforcement' },
  { id: 'chief', name: 'Chief', description: 'Local authority' },
  { id: 'admin', name: 'Administrator', description: 'System administrators' }
];

const Login = () => {
  const [userType, setUserType] = useState('reporter');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [serviceNumber, setServiceNumber] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Login attempt:", { userType, email, password, serviceNumber });
    
    if ((userType === 'police' || userType === 'medical' || userType === 'chief') && !serviceNumber) {
      toast({
        title: "Service Number Required",
        description: "Please enter your service/registration number",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Login Successful",
      description: `You've logged in as a ${userRoles.find(role => role.id === userType)?.name}`,
    });

    // Redirecting to homepage with admin access for admin roles
    if (userType === 'admin' || userType === 'police') {
      // In a real app, you would set authentication state in a context or store
      // For now, we'll use localStorage to simulate authenticated state
      localStorage.setItem('isAdminLoggedIn', 'true');
      localStorage.setItem('userRole', userType);
      navigate('/?tab=admin');
    } else {
      // For regular users, just navigate to the homepage
      navigate('/');
    }
  };

  const showServiceNumber = userType === 'police' || userType === 'medical' || userType === 'chief';

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
              <div className="flex justify-between items-center mb-6">
                <Tabs onValueChange={setUserType} value={userType} className="flex-1">
                  <TabsList className="grid grid-cols-2">
                    <TabsTrigger value="reporter">Reporter</TabsTrigger>
                    <TabsTrigger value="users" className="flex items-center">
                      <Users className="h-4 w-4 mr-1" /> Users
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="reporter">
                    <div className="text-sm text-gray-500 mb-4">
                      Regular users who report cases - Enter your credentials to login.
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="users">
                    <div className="mt-2 mb-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-between">
                            <span>{userRoles.find(role => role.id === userType)?.name || 'Select Role'}</span>
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-full">
                          <DropdownMenuLabel>User Roles</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {userRoles.filter(role => role.id !== 'reporter').map((role) => (
                            <DropdownMenuItem 
                              key={role.id} 
                              onClick={() => setUserType(role.id)}
                              className="cursor-pointer"
                            >
                              {role.name}
                              <span className="text-xs ml-2 text-muted-foreground">({role.description})</span>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

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

                {showServiceNumber && (
                  <div className="space-y-2">
                    <Label htmlFor="serviceNumber">
                      {userType === 'police' ? 'Service Number' : 
                       userType === 'chief' ? 'Chief ID' : 'Registration Number'}
                    </Label>
                    <Input
                      id="serviceNumber"
                      placeholder={`Enter your ${
                        userType === 'police' ? 'service' : 
                        userType === 'chief' ? 'chief ID' : 'registration'
                      } number`}
                      value={serviceNumber}
                      onChange={(e) => setServiceNumber(e.target.value)}
                      required
                    />
                  </div>
                )}
                
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
