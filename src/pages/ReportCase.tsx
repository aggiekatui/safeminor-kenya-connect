
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/layout/Layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

const violenceTypes = [
  'Physical Abuse',
  'Sexual Abuse',
  'Emotional Abuse',
  'Neglect',
  'FGM',
  'Child Marriage',
  'Other'
];

const counties = [
  'Baringo', 'Bomet', 'Bungoma', 'Busia', 'Elgeyo Marakwet',
  'Embu', 'Garissa', 'Homa Bay', 'Isiolo', 'Kajiado',
  'Kakamega', 'Kericho', 'Kiambu', 'Kilifi', 'Kirinyaga',
  'Kisii', 'Kisumu', 'Kitui', 'Kwale', 'Laikipia',
  'Lamu', 'Machakos', 'Makueni', 'Mandera', 'Marsabit',
  'Meru', 'Migori', 'Mombasa', 'Murang\'a', 'Nairobi',
  'Nakuru', 'Nandi', 'Narok', 'Nyamira', 'Nyandarua',
  'Nyeri', 'Samburu', 'Siaya', 'Taita Taveta', 'Tana River',
  'Tharaka Nithi', 'Trans Nzoia', 'Turkana', 'Uasin Gishu', 'Vihiga',
  'Wajir', 'West Pokot'
];

type ReportFormType = {
  victimName: string;
  victimAge: string;
  violenceType: string;
  date: string;
  county: string;
  subCounty: string;
  village: string;
  details: string;
  reporterName: string;
  reporterAge: string;
  reporterID: string;
  relationship: string;
  contactPhone: string;
};

const initialFormState: ReportFormType = {
  victimName: '',
  victimAge: '',
  violenceType: '',
  date: '',
  county: '',
  subCounty: '',
  village: '',
  details: '',
  reporterName: '',
  reporterAge: '',
  reporterID: '',
  relationship: '',
  contactPhone: '',
};

const ReportCase = () => {
  const [language, setLanguage] = useState<'english' | 'swahili'>('english');
  const [formData, setFormData] = useState<ReportFormType>(initialFormState);
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.victimName || !formData.victimAge || !formData.violenceType || !formData.date) {
        toast({
          title: language === 'english' ? "Missing information" : "Taarifa zinakosekana",
          description: language === 'english' 
            ? "Please fill in all required fields" 
            : "Tafadhali jaza sehemu zote zinazohitajika",
          variant: "destructive"
        });
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    
    toast({
      title: language === 'english' ? "Case reported successfully" : "Kesi imeripotiwa kwa mafanikio",
      description: language === 'english' 
        ? "Your case has been recorded and relevant authorities have been notified" 
        : "Kesi yako imeripotiwa na mamlaka husika zimefahamishwa",
    });

    setFormData(initialFormState);
    setStep(1);
  };

  return (
    <Layout>
      <div className="py-10 min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {language === 'english' ? 'Report a Case' : 'Ripoti Kesi'}
            </h1>
            <p className="mt-2 text-gray-600">
              {language === 'english' 
                ? 'Fill the form below to report a case of gender-based violence' 
                : 'Jaza fomu hapa chini kuripoti kesi ya ukatili wa kijinsia'}
            </p>
          </div>

          <div className="mb-6">
            <Tabs defaultValue="english" onValueChange={(value) => setLanguage(value as 'english' | 'swahili')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="english">English</TabsTrigger>
                <TabsTrigger value="swahili">Kiswahili</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'english' ? 'Case Information' : 'Taarifa za Kesi'}
              </CardTitle>
              <CardDescription>
                {language === 'english' 
                  ? 'All information is kept confidential and secure' 
                  : 'Taarifa zote zinawekwa kwa siri na usalama'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">
                      {language === 'english' ? 'Victim Information' : 'Taarifa za Mhanga'}
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="victimName">
                          {language === 'english' ? 'Victim Name' : 'Jina la Mhanga'} *
                        </Label>
                        <Input
                          id="victimName"
                          name="victimName"
                          value={formData.victimName}
                          onChange={handleChange}
                          placeholder={language === 'english' ? 'Enter name' : 'Ingiza jina'}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="victimAge">
                          {language === 'english' ? 'Victim Age' : 'Umri wa Mhanga'} *
                        </Label>
                        <Input
                          id="victimAge"
                          name="victimAge"
                          type="number"
                          min="0"
                          max="18"
                          value={formData.victimAge}
                          onChange={handleChange}
                          placeholder={language === 'english' ? 'Enter age' : 'Ingiza umri'}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="violenceType">
                        {language === 'english' ? 'Form of Violence' : 'Aina ya Ukatili'} *
                      </Label>
                      <Select
                        value={formData.violenceType}
                        onValueChange={(value) => handleSelectChange('violenceType', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={language === 'english' ? 'Select type' : 'Chagua aina'} />
                        </SelectTrigger>
                        <SelectContent>
                          {violenceTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="date">
                        {language === 'english' ? 'Date of Incident' : 'Tarehe ya Tukio'} *
                      </Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="county">
                        {language === 'english' ? 'County' : 'Kaunti'} *
                      </Label>
                      <Select
                        value={formData.county}
                        onValueChange={(value) => handleSelectChange('county', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={language === 'english' ? 'Select county' : 'Chagua kaunti'} />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px]">
                          {counties.map(county => (
                            <SelectItem key={county} value={county}>{county}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="subCounty">
                          {language === 'english' ? 'Sub County' : 'Kaunti Ndogo'}
                        </Label>
                        <Input
                          id="subCounty"
                          name="subCounty"
                          value={formData.subCounty}
                          onChange={handleChange}
                          placeholder={language === 'english' ? 'Enter sub county' : 'Ingiza kaunti ndogo'}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="village">
                          {language === 'english' ? 'Village/Estate' : 'Kijiji/Mtaa'}
                        </Label>
                        <Input
                          id="village"
                          name="village"
                          value={formData.village}
                          onChange={handleChange}
                          placeholder={language === 'english' ? 'Enter village or estate' : 'Ingiza kijiji au mtaa'}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="details">
                        {language === 'english' ? 'Details of Incident' : 'Maelezo ya Tukio'}
                      </Label>
                      <Textarea
                        id="details"
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        placeholder={language === 'english' ? 'Provide details about the incident' : 'Toa maelezo kuhusu tukio'}
                        rows={4}
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">
                      {language === 'english' ? 'Reporter Information' : 'Taarifa za Mripoti'}
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="reporterName">
                          {language === 'english' ? 'Your Name' : 'Jina Lako'} *
                        </Label>
                        <Input
                          id="reporterName"
                          name="reporterName"
                          value={formData.reporterName}
                          onChange={handleChange}
                          placeholder={language === 'english' ? 'Enter your name' : 'Ingiza jina lako'}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="reporterAge">
                          {language === 'english' ? 'Your Age' : 'Umri Wako'} *
                        </Label>
                        <Input
                          id="reporterAge"
                          name="reporterAge"
                          type="number"
                          min="18"
                          value={formData.reporterAge}
                          onChange={handleChange}
                          placeholder={language === 'english' ? 'Enter your age' : 'Ingiza umri wako'}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="reporterID">
                        {language === 'english' ? 'ID Number' : 'Namba ya Kitambulisho'} *
                      </Label>
                      <Input
                        id="reporterID"
                        name="reporterID"
                        value={formData.reporterID}
                        onChange={handleChange}
                        placeholder={language === 'english' ? 'Enter your ID number' : 'Ingiza namba ya kitambulisho'}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="relationship">
                        {language === 'english' ? 'Relationship to Victim' : 'Uhusiano na Mhanga'} *
                      </Label>
                      <Input
                        id="relationship"
                        name="relationship"
                        value={formData.relationship}
                        onChange={handleChange}
                        placeholder={language === 'english' ? 'e.g. Parent, Teacher, Neighbor' : 'k.m. Mzazi, Mwalimu, Jirani'}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">
                        {language === 'english' ? 'Contact Phone' : 'Namba ya Simu'} *
                      </Label>
                      <Input
                        id="contactPhone"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleChange}
                        placeholder={language === 'english' ? 'Enter phone number' : 'Ingiza namba ya simu'}
                      />
                    </div>
                    
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                      <p className="text-sm text-amber-800">
                        {language === 'english' 
                          ? 'By submitting this form, you declare that the information provided is true to the best of your knowledge.' 
                          : 'Kwa kuwasilisha fomu hii, unathibitisha kuwa taarifa zilizotolewa ni za kweli kwa ufahamu wako bora.'}
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              {step > 1 && (
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                >
                  {language === 'english' ? 'Previous' : 'Rudi Nyuma'}
                </Button>
              )}
              
              <div className="flex-1"></div>
              
              {step === 1 ? (
                <Button onClick={handleNext}>
                  {language === 'english' ? 'Next' : 'Endelea'}
                </Button>
              ) : (
                <Button type="button" onClick={handleSubmit}>
                  {language === 'english' ? 'Submit Report' : 'Wasilisha Ripoti'}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ReportCase;
