import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const subjectKeys = [
  { key: 'english', label: 'English Language' },
  { key: 'mathematics', label: 'Mathematics' },
  { key: 'science', label: 'Integrated Science' },
  { key: 'social_studies', label: 'Social Studies' },
  { key: 'ict', label: 'ICT' },
  { key: 'french', label: 'French' },
  { key: 'rme', label: 'RME' },
  { key: 'creative_arts', label: 'Creative Arts' },
  { key: 'ghanaian_language', label: 'Ghanaian Language' },
];

export default function ResultFormDialog({ open, onClose, result, students, onSave, saving }) {
  const [form, setForm] = useState({});

  useEffect(() => {
    if (result) {
      setForm({ ...result });
    } else {
      setForm({
        student_id: '',
        student_name: '',
        class_level: 'JHS 1',
        academic_year: '2025/2026',
        term: 'Term 1',
        remarks: '',
        english: '',
        mathematics: '',
        science: '',
        social_studies: '',
        ict: '',
        french: '',
        rme: '',
        creative_arts: '',
        ghanaian_language: '',
      });
    }
  }, [result, open]);

  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const handleStudentSelect = (studentId) => {
    const s = students.find((st) => st.student_id === studentId);
    if (s) {
      set('student_id', s.student_id);
      set('student_name', s.full_name);
      set('class_level', s.class_level);
    }
  };

  const calcTotal = () => subjectKeys.reduce((sum, sub) => sum + (parseFloat(form[sub.key]) || 0), 0);

  const calcAvg = () => {
    const filled = subjectKeys.filter((s) => form[s.key] !== '' && form[s.key] !== undefined);
    if (filled.length === 0) return 0;
    return (calcTotal() / filled.length).toFixed(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, total_score: calcTotal(), average_score: parseFloat(calcAvg()) });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{result ? 'Edit Result' : 'Add New Result'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Student *</Label>
              <Select value={form.student_id} onValueChange={handleStudentSelect}>
                <SelectTrigger><SelectValue placeholder="Select student" /></SelectTrigger>
                <SelectContent>
                  {students.map((s) => (
                    <SelectItem key={s.student_id} value={s.student_id}>
                      {s.full_name} ({s.student_id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Class Level</Label>
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
              <Label>Academic Year *</Label>
              <Input value={form.academic_year} onChange={(e) => set('academic_year', e.target.value)} required />
            </div>

            <div>
              <Label>Term *</Label>
              <Select value={form.term} onValueChange={(v) => set('term', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Term 1">Term 1</SelectItem>
                  <SelectItem value="Term 2">Term 2</SelectItem>
                  <SelectItem value="Term 3">Term 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-gray-700 mb-3 uppercase tracking-wide">
              Subject Scores (out of 100)
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {subjectKeys.map((sub) => (
                <div key={sub.key}>
                  <Label className="text-xs">{sub.label}</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={form[sub.key] ?? ''}
                    onChange={(e) => set(sub.key, e.target.value === '' ? '' : parseFloat(e.target.value))}
                    placeholder="0-100"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-6 bg-green-50 rounded-xl p-4">
            <div><span className="text-sm text-gray-500">Total:</span> <span className="font-bold text-[#1B5E20]">{calcTotal()}</span></div>
            <div><span className="text-sm text-gray-500">Average:</span> <span className="font-bold text-[#D4A017]">{calcAvg()}</span></div>
          </div>

          <div>
            <Label>Position</Label>
            <Input
              type="number"
              min="1"
              value={form.position ?? ''}
              onChange={(e) => set('position', e.target.value === '' ? '' : parseInt(e.target.value))}
            />
          </div>

          <div>
            <Label>Remarks</Label>
            <Textarea
              value={form.remarks || ''}
              onChange={(e) => set('remarks', e.target.value)}
              placeholder="Teacher remarks..."
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={saving} className="bg-[#1B5E20] hover:bg-[#2E7D32]">
              {saving ? 'Saving...' : result ? 'Update' : 'Add Result'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}