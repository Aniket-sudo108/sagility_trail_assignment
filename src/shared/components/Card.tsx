// ✅ Reusable Card Component
// Why needed?
// → Avoid repeating same UI styles (DRY principle)
// → Maintain consistent design across app
// → Easy to update UI globally from one place

export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    // Wrapper container with common styling
    <div className="bg-white rounded-xl shadow p-4">
      
      {/* 
        children → allows dynamic content inside Card
        Example:
        <Card>
          <h1>Hello</h1>
        </Card>
      */}
      {children}

    </div>
  );
};