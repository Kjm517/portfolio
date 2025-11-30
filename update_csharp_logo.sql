-- SQL to update C# logo file path to c#.png
-- This will update the file_path for the C# skill in your skills table

-- Update C# skill file_path (handles different possible name variations)
UPDATE skills 
SET file_path = '/assets/c#.png'
WHERE LOWER(name) IN ('c#', 'csharp', 'c sharp', '.net')
  OR name = 'C#'
  OR name = 'CSharp'
  OR name = 'C Sharp';

-- Verify the update
SELECT id, name, file_path, category, is_featured
FROM skills
WHERE LOWER(name) IN ('c#', 'csharp', 'c sharp', '.net')
   OR name = 'C#'
   OR name = 'CSharp'
   OR name = 'C Sharp';

