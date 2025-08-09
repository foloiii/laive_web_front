import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  companySize: string;
  reason: string;
}

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultReason?: string;
}

const ContactFormModal = ({ isOpen, onClose, defaultReason }: ContactFormModalProps) => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<ContactFormData>();
  const { toast } = useToast();

  React.useEffect(() => {
    if (defaultReason) {
      setValue('reason', defaultReason);
    }
  }, [defaultReason, setValue]);

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Submit to Formspree
      const response = await fetch('https://formspree.io/f/mblkpgwd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Contact request submitted",
          description: "Thank you! We'll get back to you within 24 hours.",
        });
        reset();
        onClose();
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium tracking-tighter">
            Get Started with Laive
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6" action="https://formspree.io/f/mblkpgwd" method="POST">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                {...register('firstName', { required: 'First name is required' })}
                className={errors.firstName ? 'border-destructive' : ''}
              />
              {errors.firstName && (
                <p className="text-sm text-destructive">{errors.firstName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                {...register('lastName', { required: 'Last name is required' })}
                className={errors.lastName ? 'border-destructive' : ''}
              />
              {errors.lastName && (
                <p className="text-sm text-destructive">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              name="companyName"
              {...register('companyName', { required: 'Company name is required' })}
              className={errors.companyName ? 'border-destructive' : ''}
            />
            {errors.companyName && (
              <p className="text-sm text-destructive">{errors.companyName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="companySize">Company Size</Label>
            <Select onValueChange={(value) => setValue('companySize', value)}>
              <SelectTrigger name="companySize">
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1-10 employees</SelectItem>
                <SelectItem value="11-50">11-50 employees</SelectItem>
                <SelectItem value="51-200">51-200 employees</SelectItem>
                <SelectItem value="201-1000">201-1000 employees</SelectItem>
                <SelectItem value="1000+">1000+ employees</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Contact</Label>
            <Select onValueChange={(value) => setValue('reason', value)} defaultValue={defaultReason}>
              <SelectTrigger name="reason">
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="demonstration">Request a Demo</SelectItem>
                <SelectItem value="free-trial">Start Free Trial</SelectItem>
                <SelectItem value="professional-signup">Professional Plan Signup</SelectItem>
                <SelectItem value="enterprise-signup">Enterprise Plan Signup</SelectItem>
                <SelectItem value="custom-signup">Custom Solution</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Submit Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormModal;
