
interface Submission {
  id: string;
  data: any;
  createdAt: string;
}

class DataStore {
  private submissions: Submission[] = [];
  private idCounter = 1;

  addSubmission(data: any): Submission {
    const submission: Submission = {
      id: `SUB${String(this.idCounter).padStart(6, '0')}`,
      data,
      createdAt: new Date().toISOString()
    };

    this.submissions.push(submission);
    this.idCounter++;

    return submission;
  }

  getSubmissions(
    page: number = 1,
    limit: number = 10,
    sortBy: string = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc'
  ): { submissions: Submission[]; total: number; page: number; totalPages: number } {
    let sorted = [...this.submissions];

    if (sortBy === 'createdAt') {
      sorted.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
    }

    const total = sorted.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedSubmissions = sorted.slice(start, end);

    return {
      submissions: paginatedSubmissions,
      total,
      page,
      totalPages
    };
  }

  getSubmissionById(id: string): Submission | undefined {
    return this.submissions.find(sub => sub.id === id);
  }
}

export const dataStore = new DataStore();
