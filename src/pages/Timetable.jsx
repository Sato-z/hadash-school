import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import PageHeader from '@/components/shared/PageHeader';
import { timetableService } from '@/services/timetableService';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const periods = [
  { num: 1, time: '7:30 - 8:15' },
  { num: 2, time: '8:15 - 9:00' },
  { num: 3, time: '9:00 - 9:45' },
  { num: 4, time: '9:45 - 10:15', isBreak: true, label: 'Break' },
  { num: 5, time: '10:15 - 11:00' },
  { num: 6, time: '11:00 - 11:45' },
  { num: 7, time: '11:45 - 12:30' },
  { num: 8, time: '12:30 - 1:00', isBreak: true, label: 'Lunch' },
];

const SUBJECTS = [
  'English Language',
  'Mathematics',
  'Integrated Science',
  'Social Studies',
  'ICT',
  'French',
  'RME',
  'Creative Arts',
  'Ghanaian Language',
];

const subjectColors = {
  'English Language': 'bg-blue-50 text-blue-800 border-blue-200',
  Mathematics: 'bg-green-50 text-green-800 border-green-200',
  'Integrated Science': 'bg-purple-50 text-purple-800 border-purple-200',
  'Social Studies': 'bg-amber-50 text-amber-800 border-amber-200',
  ICT: 'bg-cyan-50 text-cyan-800 border-cyan-200',
  French: 'bg-pink-50 text-pink-800 border-pink-200',
  RME: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  'Creative Arts': 'bg-orange-50 text-orange-800 border-orange-200',
  'Ghanaian Language': 'bg-emerald-50 text-emerald-800 border-emerald-200',
};

export default function Timetable() {
  const queryClient = useQueryClient();
  const [classLevel, setClassLevel] = useState('JHS 1');
  const [formOpen, setFormOpen] = useState(false);
  const [editEntry, setEditEntry] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({ day: 'Monday', period: 1, subject: '', teacher: '' });

  const { data: entries = [] } = useQuery({
    queryKey: ['timetable'],
    queryFn: timetableService.list,
  });

  const saveMutation = useMutation({
    mutationFn: (data) =>
      editEntry ? timetableService.update(editEntry.id, data) : timetableService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timetable'] });
      setFormOpen(false);
      setEditEntry(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: timetableService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timetable'] });
      setDeleteId(null);
    },
  });

  const classEntries = entries.filter((e) => e.class_level === classLevel);
  const getEntry = (day, num) => classEntries.find((e) => e.day === day && e.period === num);

  const openAdd = (day, num) => {
    setEditEntry(null);
    setForm({ day, period: num, subject: '', teacher: '', class_level: classLevel });
    setFormOpen(true);
  };

  const openEdit = (entry, e) => {
    e.stopPropagation();
    setEditEntry(entry);
    setForm({
      day: entry.day,
      period: entry.period,
      subject: entry.subject,
      teacher: entry.teacher || '',
      class_level: entry.class_level,
    });
    setFormOpen(true);
  };

  return (
    <div>
      <PageHeader title="Timetable Management" subtitle="Add and edit class schedules">
        <Select value={classLevel} onValueChange={setClassLevel}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="JHS 1">JHS 1</SelectItem>
            <SelectItem value="JHS 2">JHS 2</SelectItem>
            <SelectItem value="JHS 3">JHS 3</SelectItem>
          </SelectContent>
        </Select>
      </PageHeader>

      <div className="kente-border rounded-full mb-6" />
      <p className="text-sm text-gray-500 mb-4">
        Click any empty cell to add a subject, or hover an entry to edit/delete.
      </p>

      <div className="bg-white rounded-2xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1B5E20] text-white">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider w-28">
                  Period
                </th>
                {days.map((day) => (
                  <th
                    key={day}
                    className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {periods.map((p) => (
                <tr key={p.num} className={p.isBreak ? 'bg-amber-50' : 'border-b'}>
                  <td className="px-4 py-3">
                    <p className="text-xs font-bold text-gray-700">
                      {p.isBreak ? p.label : `Period ${p.num}`}
                    </p>
                    <p className="text-[10px] text-gray-400">{p.time}</p>
                  </td>

                  {days.map((day) => {
                    if (p.isBreak) {
                      return (
                        <td
                          key={day}
                          className="px-4 py-3 text-center text-xs text-amber-600 font-medium"
                        >
                          {p.label}
                        </td>
                      );
                    }

                    const entry = getEntry(day, p.num);
                    const colorClass = entry
                      ? subjectColors[entry.subject] || 'bg-gray-50 text-gray-700 border-gray-200'
                      : '';

                    return (
                      <td key={day} className="px-2 py-2">
                        {entry ? (
                          <div
                            className={`group relative rounded-lg border p-2 text-center cursor-pointer ${colorClass}`}
                          >
                            <p className="text-xs font-semibold">{entry.subject}</p>
                            {entry.teacher && (
                              <p className="text-[10px] mt-0.5 opacity-70">{entry.teacher}</p>
                            )}

                            <div className="absolute inset-0 bg-black/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                              <button
                                onClick={(e) => openEdit(entry, e)}
                                className="p-1 bg-white rounded-lg shadow"
                              >
                                <Edit2 className="w-3 h-3 text-gray-700" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDeleteId(entry.id);
                                }}
                                className="p-1 bg-white rounded-lg shadow"
                              >
                                <Trash2 className="w-3 h-3 text-red-500" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => openAdd(day, p.num)}
                            className="w-full h-12 rounded-lg border border-dashed border-gray-200 hover:border-[#1B5E20] hover:bg-green-50 transition-all flex items-center justify-center"
                          >
                            <Plus className="w-3.5 h-3.5 text-gray-300" />
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{editEntry ? 'Edit Entry' : 'Add Timetable Entry'}</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveMutation.mutate({ ...form, class_level: classLevel });
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Day</Label>
                <Select
                  value={form.day}
                  onValueChange={(v) => setForm((f) => ({ ...f, day: v }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Period</Label>
                <Select
                  value={String(form.period)}
                  onValueChange={(v) => setForm((f) => ({ ...f, period: parseInt(v) }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {periods
                      .filter((p) => !p.isBreak)
                      .map((p) => (
                        <SelectItem key={p.num} value={String(p.num)}>
                          Period {p.num}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Subject *</Label>
              <Select
                value={form.subject}
                onValueChange={(v) => setForm((f) => ({ ...f, subject: v }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {SUBJECTS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Teacher</Label>
              <Input
                value={form.teacher}
                onChange={(e) => setForm((f) => ({ ...f, teacher: e.target.value }))}
                placeholder="e.g. Mr. Mensah"
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setFormOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#1B5E20] hover:bg-[#2E7D32]"
                disabled={!form.subject || saveMutation.isPending}
              >
                {saveMutation.isPending ? 'Saving...' : editEntry ? 'Update' : 'Add'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Entry</AlertDialogTitle>
            <AlertDialogDescription>Remove this timetable entry?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteMutation.mutate(deleteId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}