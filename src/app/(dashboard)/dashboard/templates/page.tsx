"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Copy, Edit, Trash2, Star } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import type { DashboardTemplate } from "@/types/template";

export default function TemplatesPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<DashboardTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadTemplates = useCallback(async () => {
    try {
      const { data } = await axios.get<DashboardTemplate[]>("/api/templates");
      setTemplates(data);
    } catch {
      toast.error("Gagal memuat template");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(loadTemplates);
  }, [loadTemplates]);

  const handleDuplicate = async (template: DashboardTemplate) => {
    try {
      await axios.post("/api/templates", {
        name: `${template.name} (Copy)`,
        slug: `${template.slug}-copy-${Date.now()}`,
        description: template.description,
        category: template.category,
        layout: template.layout,
        styles: template.styles,
        isPremium: false,
      });
      toast.success("Template berhasil diduplikasi");
      loadTemplates();
    } catch {
      toast.error("Gagal menduplikasi template");
    }
  };

  const handleDelete = async (id: string, isDefault: boolean) => {
    if (isDefault) {
      toast.error("Template default tidak bisa dihapus");
      return;
    }
    
    if (confirm("Yakin ingin menghapus template ini?")) {
      try {
        await axios.delete(`/api/templates/${id}`);
        toast.success("Template berhasil dihapus");
        loadTemplates();
      } catch {
        toast.error("Gagal menghapus template");
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-3xl text-brown">Kelola Template</h1>
          <p className="text-brown-light mt-1">Buat dan kelola template undangan</p>
        </div>
        <button
          onClick={() => router.push("/dashboard/templates/create")}
          className="flex items-center gap-2 px-4 py-2 bg-brown text-gold-light rounded-lg hover:bg-gold hover:text-brown transition-colors"
        >
          <Plus size={18} />
          <span>Buat Template Baru</span>
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-20">Memuat template...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg border border-gold/20 overflow-hidden hover:shadow-lg transition-shadow group"
            >
              {/* Template Preview */}
              <div 
                className="aspect-video bg-gradient-to-br p-4 relative cursor-pointer"
                style={{ 
                  backgroundColor: template.layout?.colors?.background || "#FAF7F2",
                }}
                onClick={() => router.push(`/dashboard/templates/${template.id}/edit`)}
              >
                <div className="text-center">
                  <div className="font-serif text-lg">{template.name}</div>
                  <div className="text-xs mt-2 opacity-70">{template.category}</div>
                </div>
                {template.isDefault && (
                  <div className="absolute top-2 right-2">
                    <Star size={16} className="text-gold fill-gold" />
                  </div>
                )}
                {template.isPremium && (
                  <div className="absolute bottom-2 left-2 bg-gold text-brown text-xs px-2 py-0.5 rounded">
                    Premium
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="p-4">
                <p className="text-sm text-brown-light line-clamp-2 mb-3">
                  {template.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-brown-light">
                    Digunakan {template.usageCount} kali
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDuplicate(template)}
                      className="p-1.5 text-brown-light hover:text-gold transition-colors"
                      title="Duplikat"
                    >
                      <Copy size={16} />
                    </button>
                    <button
                      onClick={() => router.push(`/dashboard/templates/${template.id}/edit`)}
                      className="p-1.5 text-brown-light hover:text-gold transition-colors"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    {!template.isDefault && (
                      <button
                        onClick={() => handleDelete(template.id, template.isDefault)}
                        className="p-1.5 text-brown-light hover:text-red-500 transition-colors"
                        title="Hapus"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
