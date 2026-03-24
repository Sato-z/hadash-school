import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Search, Edit2, Trash2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import StudentFormDialog from '@/components/students/StudentFormDialog';
import { studentService } from '@/services/studentService';
import { resultService } from '@/services/resultService';

export default function Students() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [formOpen, setFormOpen] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const { data: students = [], isLoading } = useQuery({
    queryKey: ['students'],
    queryFn: studentService.list,
  });

  const { data: results = [] } = useQuery({
    queryKey: ['results'],
    queryFn: resultService.list,
  });

  const saveMutation = useMutation({
    mutationFn: (data) =>
      editStudent ? studentService.update(editStudent.id, data) : studentService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      setFormOpen(false);
      setEditStudent(null);
      setErrorMessage('');
    },
    onError: (error) => {
      setErrorMessage(error.message || 'Could not save student');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: studentService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      setDeleteId(null);
    },
  });

  const filtered = students.filter((s) => {
    const text = search.toLowerCase();
    const matchSearch =
      s.full_name?.toLowerCase().includes(text) || s.student_id?.toLowerCase().includes(text);
    return matchSearch && (classFilter === 'all' || s.class_level === classFilter);
  });

  const getLatestAvg = (studentId) => {
    const sr = results.filter((r) => r.student_id === studentId);
    if (!sr.length) return null;
    return sr.sort((a, b) => new Date(b.created_date) - new Date(a.created_date))[0].average_score;
  };

  const statusColors = {
    Active: 'bg-green-100 text-green-800',
    Inactive: 'bg-gray-100 text-gray-600',
    Graduated: 'bg-amber-100 text-amber-800',
  };

  return (
    <div>
      <PageHeader title="Students" subtitle={`${students.length} students enrolled`}>
        <Button
          onClick={() => {
            setEditStudent(null);
            setErrorMessage('');
            setFormOpen(true);
          }}
          className="bg-[#1B5E20] hover:bg-[#2E7D32]"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Student
        </Button>
      </PageHeader>

      <div className="kente-border rounded-full mb-6" />

      {errorMessage && (
        <div className="mb-4 p-3 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm">
          {errorMessage}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={classFilter} onValueChange={setClassFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            <SelectItem value="JHS 1">JHS 1</SelectItem>
            <SelectItem value="JHS 2">JHS 2</SelectItem>
            <SelectItem value="JHS 3">JHS 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-2xl border overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-gray-400">Loading students...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400">No students found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50/80">
                  {['Student', 'ID', 'Class', 'Latest Avg', 'Status', 'Actions'].map((h) => (
                    <th
                      key={h}
                      className={`text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3 ${
                        h === 'Actions' ? 'text-right' : 'text-left'
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y">
                {filtered.map((s) => {
                  const avg = getLatestAvg(s.student_id);
                  return (
                    <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#1B5E20] flex items-center justify-center text-white text-sm font-bold">
                            {s.full_name?.[0]?.toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-sm text-gray-900">{s.full_name}</p>
                            <p className="text-xs text-gray-400">{s.gender}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm font-mono text-gray-600">
                        {s.student_id}
                      </td>

                      <td className="px-6 py-4">
                        <Badge variant="outline" className="text-xs">
                          {s.class_level}
                        </Badge>
                      </td>

                      <td className="px-6 py-4">
                        {avg !== null ? (
                          <span className="font-semibold text-sm text-[#1B5E20]">
                            {avg.toFixed(1)}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-300">—</span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <Badge className={`text-xs ${statusColors[s.status] || ''}`}>
                          {s.status}
                        </Badge>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                              setEditStudent(s);
                              setErrorMessage('');
                              setFormOpen(true);
                            }}
                          >
                            <Edit2 className="w-4 h-4 text-gray-500" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => setDeleteId(s.id)}>
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <StudentFormDialog
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditStudent(null);
          setErrorMessage('');
        }}
        student={editStudent}
        onSave={(data) => saveMutation.mutate(data)}
        saving={saveMutation.isPending}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Student</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure? This cannot be undone.
            </AlertDialogDescription>
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