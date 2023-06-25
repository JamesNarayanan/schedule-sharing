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
      courses: {
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
            foreignKeyName: "courses_subject_fkey"
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
          course_id: number
          crn: number
          id: number
          name: string
          semester_id: number
        }
        Insert: {
          course_id: number
          crn: number
          id?: number
          name: string
          semester_id: number
        }
        Update: {
          course_id?: number
          crn?: number
          id?: number
          name?: string
          semester_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "sections_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses"
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
      user_sections: {
        Row: {
          section_id: number
          user_id: string
        }
        Insert: {
          section_id: number
          user_id: string
        }
        Update: {
          section_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_sections_section_id_fkey"
            columns: ["section_id"]
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_sections_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
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
