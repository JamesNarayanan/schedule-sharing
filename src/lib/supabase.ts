export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      classes: {
        Row: {
          course_number: number
          id: number
          name: string
          subject: number
        }
        Insert: {
          course_number: number
          id?: number
          name: string
          subject: number
        }
        Update: {
          course_number?: number
          id?: number
          name?: string
          subject?: number
        }
        Relationships: [
          {
            foreignKeyName: "classes_subject_fkey"
            columns: ["subject"]
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          }
        ]
      }
      groups: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      sections: {
        Row: {
          class_id: number | null
          crn: number
          id: number
          name: string
          semester_id: number | null
        }
        Insert: {
          class_id?: number | null
          crn: number
          id?: number
          name: string
          semester_id?: number | null
        }
        Update: {
          class_id?: number | null
          crn?: number
          id?: number
          name?: string
          semester_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sections_class_id_fkey"
            columns: ["class_id"]
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sections_semester_id_fkey"
            columns: ["semester_id"]
            referencedRelation: "semesters"
            referencedColumns: ["id"]
          }
        ]
      }
      semesters: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      subjects: {
        Row: {
          abbreviation: string
          id: number
          name: string
        }
        Insert: {
          abbreviation: string
          id?: number
          name: string
        }
        Update: {
          abbreviation?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      user_classes: {
        Row: {
          class_id: number
          user_id: number
        }
        Insert: {
          class_id: number
          user_id: number
        }
        Update: {
          class_id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_classes_class_id_fkey"
            columns: ["class_id"]
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_classes_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          group_id: string
          id: number
          name: string
        }
        Insert: {
          group_id: string
          id?: number
          name: string
        }
        Update: {
          group_id?: string
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_group_id_fkey"
            columns: ["group_id"]
            referencedRelation: "groups"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
