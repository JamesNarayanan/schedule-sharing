export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      courses: {
        Row: {
          course_number: string
          id: number
          name: string
          subject_id: number
        }
        Insert: {
          course_number: string
          id?: number
          name: string
          subject_id: number
        }
        Update: {
          course_number?: string
          id?: number
          name?: string
          subject_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "courses_subject_id_fkey"
            columns: ["subject_id"]
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
      users: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users_groups: {
        Row: {
          group_id: string
          user_id: string
        }
        Insert: {
          group_id: string
          user_id: string
        }
        Update: {
          group_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_groups_group_id_fkey"
            columns: ["group_id"]
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_groups_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users_sections: {
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
            foreignKeyName: "users_sections_section_id_fkey"
            columns: ["section_id"]
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_sections_user_id_fkey"
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
      create_join_group: {
        Args: {
          group_name: string
          user_id: string
        }
        Returns: string
      }
      join_get_group: {
        Args: {
          group_id: string
          user_id: string
        }
        Returns: {
          created_at: string | null
          id: string
          name: string
        }[]
      }
      register_class: {
        Args: {
          subject_abbrev: string
          course_number: string
          course_name: string
          crn: number
          semester_id: number
          section_name: string
          user_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
