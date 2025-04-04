import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { User } from "@shared/schema";
import { Loader2, UserPlus, Users, Trash2, RefreshCw, Check, X, Edit, EyeOff, Save } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Form validation schema for creating a new user
const createUserSchema = z.object({
  firstName: z.string().min(2, { message: "Ad en az 2 karakter olmalıdır" }),
  lastName: z.string().min(2, { message: "Soyad en az 2 karakter olmalıdır" }),
  username: z.string().min(3, { message: "Kullanıcı adı en az 3 karakter olmalıdır" }),
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz" }),
  password: z.string().min(6, { message: "Şifre en az 6 karakter olmalıdır" }),
  phone: z.string().optional(),
  role: z.enum(["user", "officer", "admin"], {
    required_error: "Lütfen bir rol seçin",
  }),
});

// Form validation schema for updating an existing user
const updateUserSchema = z.object({
  firstName: z.string().min(2, { message: "Ad en az 2 karakter olmalıdır" }),
  lastName: z.string().min(2, { message: "Soyad en az 2 karakter olmalıdır" }),
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz" }),
  phone: z.string().optional(),
  role: z.enum(["user", "officer", "admin"], {
    required_error: "Lütfen bir rol seçin",
  }),
  password: z.string().min(6, { message: "Şifre en az 6 karakter olmalıdır" }).optional().or(z.literal('')),
});

type CreateUserFormValues = z.infer<typeof createUserSchema>;
type UpdateUserFormValues = z.infer<typeof updateUserSchema>;

export default function AdminUsers() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  
  // Redirect if not admin
  if (user?.role !== "admin") {
    return <Redirect to="/" />;
  }
  
  // Query to fetch all users
  const { data: users, isLoading: isLoadingUsers } = useQuery<User[]>({
    queryKey: ["/api/users"],
  });
  
  // Create user mutation
  const createUserMutation = useMutation({
    mutationFn: async (userData: CreateUserFormValues) => {
      const response = await apiRequest("POST", "/api/users", userData);
      return response;
    },
    onSuccess: () => {
      toast({
        title: "Başarılı!",
        description: "Kullanıcı başarıyla oluşturuldu.",
      });
      setShowCreateDialog(false);
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Hata",
        description: `Kullanıcı oluşturulurken bir hata oluştu: ${error.message}`,
        variant: "destructive",
      });
    },
  });
  
  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: async ({ id, userData }: { id: number; userData: UpdateUserFormValues }) => {
      // If password is empty, omit it from the request
      if (userData.password === '') {
        const { password, ...rest } = userData;
        return await apiRequest("PUT", `/api/users/${id}`, rest);
      }
      return await apiRequest("PUT", `/api/users/${id}`, userData);
    },
    onSuccess: () => {
      toast({
        title: "Başarılı!",
        description: "Kullanıcı bilgileri başarıyla güncellendi.",
      });
      setShowEditDialog(false);
      setSelectedUser(null);
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Hata",
        description: `Kullanıcı güncellenirken bir hata oluştu: ${error.message}`,
        variant: "destructive",
      });
    },
  });
  
  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest("DELETE", `/api/users/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Başarılı!",
        description: "Kullanıcı başarıyla silindi.",
      });
      setDeleteUserId(null);
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Hata",
        description: `Kullanıcı silinirken bir hata oluştu: ${error.message}`,
        variant: "destructive",
      });
    },
  });
  
  // Create user form
  const createForm = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      phone: "",
      role: "user",
    },
  });
  
  // Update user form
  const updateForm = useForm<UpdateUserFormValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "user",
      password: "",
    },
  });
  
  // Handle create user form submission
  function onCreateSubmit(values: CreateUserFormValues) {
    createUserMutation.mutate(values);
  }
  
  // Handle update user form submission
  function onUpdateSubmit(values: UpdateUserFormValues) {
    if (selectedUser) {
      updateUserMutation.mutate({ id: selectedUser.id, userData: values });
    }
  }
  
  // Handle opening edit dialog
  function handleEditUser(user: User) {
    setSelectedUser(user);
    updateForm.reset({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone || "",
      role: user.role,
      password: "",
    });
    setShowEditDialog(true);
  }
  
  // Handle deleting a user
  function handleDeleteUser(userId: number) {
    setDeleteUserId(userId);
  }
  
  // Confirm user deletion
  function confirmDeleteUser() {
    if (deleteUserId !== null) {
      deleteUserMutation.mutate(deleteUserId);
    }
  }
  
  // Get role display text and badge color
  function getRoleBadge(role: string) {
    if (role === "admin") {
      return { text: "Yönetici", color: "bg-red-100 text-red-800" };
    } else if (role === "officer") {
      return { text: "Memur", color: "bg-blue-100 text-blue-800" };
    } else {
      return { text: "Kullanıcı", color: "bg-gray-100 text-gray-800" };
    }
  }
  
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Kullanıcı Yönetimi</h1>
              <p className="text-gray-600">Sistem kullanıcılarını görüntüleyin, düzenleyin ve yönetin</p>
            </div>
            
            <Button onClick={() => {
              createForm.reset();
              setShowCreateDialog(true);
            }}>
              <UserPlus className="mr-2 h-4 w-4" />
              Yeni Kullanıcı Ekle
            </Button>
          </div>
          
          {/* User List Card */}
          <Card>
            <CardHeader>
              <CardTitle>Kullanıcı Listesi</CardTitle>
              <CardDescription>
                Sistemdeki tüm kullanıcılar ve rolleri burada listelenir
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingUsers ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : !users || users.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                  <p>Henüz hiç kullanıcı bulunmuyor.</p>
                </div>
              ) : (
                <div className="rounded-md border">
                  <div className="grid grid-cols-7 p-3 text-sm font-medium text-gray-500 bg-gray-100">
                    <div>ID</div>
                    <div className="col-span-2">Ad Soyad</div>
                    <div>E-posta</div>
                    <div>Kullanıcı Adı</div>
                    <div>Rol</div>
                    <div className="text-right">İşlemler</div>
                  </div>
                  <div className="divide-y">
                    {users.map((u) => (
                      <div key={u.id} className="grid grid-cols-7 p-3 text-sm">
                        <div>{u.id}</div>
                        <div className="col-span-2 font-medium">{u.firstName} {u.lastName}</div>
                        <div>{u.email}</div>
                        <div>{u.username}</div>
                        <div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadge(u.role).color}`}>
                            {getRoleBadge(u.role).text}
                          </span>
                        </div>
                        <div className="text-right space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditUser(u)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Düzenle</span>
                          </Button>
                          
                          {u.id !== user?.id && (
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteUser(u.id)}>
                              <Trash2 className="h-4 w-4 text-red-500" />
                              <span className="sr-only">Sil</span>
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Create User Dialog */}
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Yeni Kullanıcı Ekle</DialogTitle>
                <DialogDescription>
                  Sisteme yeni bir kullanıcı eklemek için aşağıdaki formu doldurun.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...createForm}>
                <form onSubmit={createForm.handleSubmit(onCreateSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={createForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ad</FormLabel>
                          <FormControl>
                            <Input placeholder="Kullanıcı adı" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={createForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Soyad</FormLabel>
                          <FormControl>
                            <Input placeholder="Kullanıcı soyadı" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={createForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kullanıcı Adı</FormLabel>
                        <FormControl>
                          <Input placeholder="Sisteme giriş için kullanıcı adı" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={createForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-posta</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="ornek@mail.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={createForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Şifre</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="******" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={createForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefon (İsteğe Bağlı)</FormLabel>
                        <FormControl>
                          <Input placeholder="+90 555 123 4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={createForm.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rol</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Rol seçin" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="user">Kullanıcı</SelectItem>
                            <SelectItem value="officer">Memur</SelectItem>
                            <SelectItem value="admin">Yönetici</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setShowCreateDialog(false)}>
                      İptal
                    </Button>
                    <Button type="submit" disabled={createUserMutation.isPending}>
                      {createUserMutation.isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <UserPlus className="mr-2 h-4 w-4" />
                      )}
                      Kullanıcı Oluştur
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          
          {/* Edit User Dialog */}
          <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Kullanıcı Düzenle</DialogTitle>
                <DialogDescription>
                  Kullanıcı bilgilerini güncellemek için formu düzenleyin.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...updateForm}>
                <form onSubmit={updateForm.handleSubmit(onUpdateSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={updateForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ad</FormLabel>
                          <FormControl>
                            <Input placeholder="Kullanıcı adı" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={updateForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Soyad</FormLabel>
                          <FormControl>
                            <Input placeholder="Kullanıcı soyadı" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={updateForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-posta</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="ornek@mail.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={updateForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Şifre (Boş bırakılırsa değişmez)</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Değiştirmek için yeni şifre girin" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={updateForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefon (İsteğe Bağlı)</FormLabel>
                        <FormControl>
                          <Input placeholder="+90 555 123 4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Disable role change for the current admin user */}
                  <FormField
                    control={updateForm.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rol</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          disabled={selectedUser?.id === user?.id}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Rol seçin" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="user">Kullanıcı</SelectItem>
                            <SelectItem value="officer">Memur</SelectItem>
                            <SelectItem value="admin">Yönetici</SelectItem>
                          </SelectContent>
                        </Select>
                        {selectedUser?.id === user?.id && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Kendi rolünüzü değiştiremezsiniz.
                          </p>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setShowEditDialog(false)}>
                      İptal
                    </Button>
                    <Button type="submit" disabled={updateUserMutation.isPending}>
                      {updateUserMutation.isPending ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="mr-2 h-4 w-4" />
                      )}
                      Değişiklikleri Kaydet
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          
          {/* Delete User Confirmation Dialog */}
          <AlertDialog open={deleteUserId !== null} onOpenChange={(open) => !open && setDeleteUserId(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Kullanıcıyı Silmeyi Onaylıyor musunuz?</AlertDialogTitle>
                <AlertDialogDescription>
                  Bu işlem geri alınamaz. Bu kullanıcı sistemden kalıcı olarak silinecektir.
                  Eğer kullanıcının başvuruları varsa, kullanıcı silinemez.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>İptal</AlertDialogCancel>
                <AlertDialogAction 
                  className="bg-red-500 hover:bg-red-600" 
                  onClick={confirmDeleteUser}
                  disabled={deleteUserMutation.isPending}
                >
                  {deleteUserMutation.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="mr-2 h-4 w-4" />
                  )}
                  Kullanıcıyı Sil
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </main>
      </div>
    </div>
  );
}