import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Search, Edit2, Trash2, ClipboardList } from 'lucide-react';
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
import ResultFormDialog from '@/components/results/ResultFormDialog';
import { getGrade } from '@/components/shared/GradeHelper';
import { resultService } from '@/services/resultService';
import { studentService } from '@/services/studentService';

export default function Results() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [termFilter, setTermFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');
  const [formOpen, setFormOpen] = useState(false);
  const [editResult, setEditResult] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const { data: results = [], isLoading } = useQuery({
    queryKey: ['results'],
    queryFn: resultService.list,
  });

  const { data: students = [] } = useQuery({
    queryKey: ['students'],
    queryFn: studentService.list,
  });

  const saveMutation = useMutation({
    mutationFn: (data) =>
      editResult ? resultService.update(editResult.id, data) : resultService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['results'] });
      setFormOpen(false);
      setEditResult(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: resultService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['results'] });
      setDeleteId(null);
    },
  });

  const filtered = results.filter((r) => {
    const matchSearch =
      r.student_name?.toLowerCase().includes(search.toLowerCase()) ||
      r.student_id?.toLowerCase().includes(search.toLowerCase());

    return (
      matchSearch &&
      (termFilter === 'all' || r.term === termFilter) &&
      (classFilter === 'all' || r.class_level === classFilter)
    );
  });

  return (
    <div>
      <PageHeader title="Results" subtitle={`${results.length} results recorded`}>
        <Button
          onClick={() => {
            setEditResult(null);
            setFormOpen(true);
          }}
          className="bg-[#1B5E20] hover:bg-[#2E7D32]"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Result
        </Button>
      </PageHeader>

      <div className="kente-border rounded-full mb-6" />

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={classFilter} onValueChange={setClassFilter}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            <SelectItem value="JHS 1">JHS 1</SelectItem>
            <SelectItem value="JHS 2">JHS 2</SelectItem>
            <SelectItem value="JHS 3">JHS 3</SelectItem>
          </SelectContent>
        </Select>

        <Select value={termFilter} onValueChange={setTermFilter}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Terms</SelectItem>
            <SelectItem value="Term 1">Term 1</SelectItem>
            <SelectItem value="Term 2">Term 2</SelectItem>
            <SelectItem value="Term 3">Term 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-2xl border overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-gray-400">Loading results...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <ClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400">No results found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50/80">
                  {['Student', 'Class', 'Term', 'Year', 'Total', 'Average', 'Grade', 'Actions'].map(
                    (h) => (
                      <th
                        key={h}
                        className={`text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3 ${
                          h === 'Actions' ? 'text-right' : 'text-left'
                        }`}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody className="divide-y">
                {filtered.map((r) => {
                  const grade = getGrade(r.average_score || 0);

                  return (
                    <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium text-sm">{r.student_name}</p>
                        <p className="text-xs text-gray-400">{r.student_id}</p>
                      </td>

                      <td className="px-6 py-4">
                        <Badge variant="outline" className="text-xs">
                          {r.class_level}
                        </Badge>
                      </td>

                      <td className="px-6 py-4 text-sm">{r.term}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{r.academic_year}</td>
                      <td className="px-6 py-4 font-semibold text-sm">{r.total_score || '—'}</td>
                      <td className="px-6 py-4 font-bold text-sm text-[#1B5E20]">
                        {r.average_score?.toFixed(1) || '—'}
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={`text-xs ${grade.color}`}>
                          Grade {grade.grade} - {grade.label}
                        </Badge>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                              setEditResult(r);
                              setFormOpen(true);
                            }}
                          >
                            <Edit2 className="w-4 h-4 text-gray-500" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => setDeleteId(r.id)}>
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

      <ResultFormDialog
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditResult(null);
        }}
        result={editResult}
        students={students}
        onSave={(data) => saveMutation.mutate(data)}
        saving={saveMutation.isPending}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Result</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this result?
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