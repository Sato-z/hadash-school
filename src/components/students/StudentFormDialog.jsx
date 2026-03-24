import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const emptyStudent = {
  full_name: '',
  student_id: '',
  pin: '',
  class_level: 'JHS 1',
  date_of_birth: '',
  gender: 'Male',
  parent_name: '',
  parent_phone: '',
  address: '',
  status: 'Active',
};

export default function StudentFormDialog({ open, onClose, student, onSave, saving }) {
  const [form, setForm] = useState(emptyStudent);

  useEffect(() => {
    setForm(student ? { ...emptyStudent, ...student } : emptyStudent);
  }, [student, open]);

  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{student ? 'Edit Student' : 'Add New Student'}</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(form);
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label>Full Name *</Label>
              <Input value={form.full_name} onChange={(e) => set('full_name', e.target.value)} required />
            </div>

            <div>
              <Label>Student ID *</Label>
              <Input value={form.student_id} onChange={(e) => set('student_id', e.target.value)} required />
            </div>

            <div>
              <Label>Class Level *</Label>
              <Select value={form.class_level} onValueChange={(v) => set('class_level', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="JHS 1">JHS 1</SelectItem>
                  <SelectItem value="JHS 2">JHS 2</SelectItem>
                  <SelectItem value="JHS 3">JHS 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Date of Birth</Label>
              <Input type="date" value={form.date_of_birth} onChange={(e) => set('date_of_birth', e.target.value)} />
            </div>

            <div>
              <Label>Gender</Label>
              <Select value={form.gender} onValueChange={(v) => set('gender', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Parent/Guardian Name</Label>
              <Input value={form.parent_name} onChange={(e) => set('parent_name', e.target.value)} />
            </div>

            <div>
              <Label>Parent Phone</Label>
              <Input value={form.parent_phone} onChange={(e) => set('parent_phone', e.target.value)} />
            </div>

            <div className="col-span-2">
              <Label>Address</Label>
              <Input value={form.address} onChange={(e) => set('address', e.target.value)} />
            </div>

            <div>
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => set('status', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Graduated">Graduated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Login PIN <span className="text-gray-400 font-normal">(student portal)</span></Label>
              <Input
                type="password"
                value={form.pin || ''}
                onChange={(e) => set('pin', e.target.value)}
                placeholder="4–6 digit PIN"
                maxLength={6}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={saving} className="bg-[#1B5E20] hover:bg-[#2E7D32]">
              {saving ? 'Saving...' : student ? 'Update' : 'Add Student'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}