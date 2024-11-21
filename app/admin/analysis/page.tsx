import DataAnalysis from '@/app/../components/admin/dataAnalysis';

// Example data - replace with your actual data fetching logic
const sampleReportContent = {
  career_fair_id: "cf123",
  total_registered_students: 500,
  total_attended_students: 450,
  total_registered_companies: 50,
  total_attended_companies: 48,
  total_positions: 200
};

export default function DataAnalysisPage() {
  return (
    <DataAnalysis 
      careerFairId={sampleReportContent.career_fair_id}
      reportContent={sampleReportContent}
    />
  );
}