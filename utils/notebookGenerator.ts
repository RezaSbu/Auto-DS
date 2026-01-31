export const generateNotebookJSON = (pythonCode: string): string => {
  // Split code into cells based on logical breaks or just one big cell.
  // For better UX, we'll try to split by standard comments like "# Step" or double newlines.
  
  const cells = [];
  const lines = pythonCode.split('\n');
  let currentBuffer: string[] = [];
  
  lines.forEach(line => {
    // If we hit a major header comment, start a new cell
    if (line.trim().startsWith('# Step') || line.trim().startsWith('# مرحله')) {
       if (currentBuffer.length > 0) {
         cells.push({
           cell_type: "code",
           execution_count: null,
           metadata: {},
           outputs: [],
           source: currentBuffer.map(l => l + "\n")
         });
         currentBuffer = [];
       }
    }
    currentBuffer.push(line);
  });

  if (currentBuffer.length > 0) {
    cells.push({
      cell_type: "code",
      execution_count: null,
      metadata: {},
      outputs: [],
      source: currentBuffer.map(l => l + "\n")
    });
  }

  const notebook = {
    cells: cells,
    metadata: {
      kernelspec: {
        display_name: "Python 3",
        language: "python",
        name: "python3"
      },
      language_info: {
        codemirror_mode: {
          name: "ipython",
          version: 3
        },
        file_extension: ".py",
        mimetype: "text/x-python",
        name: "python",
        nbconvert_exporter: "python",
        pygments_lexer: "ipython3",
        version: "3.8.5"
      }
    },
    nbformat: 4,
    nbformat_minor: 4
  };

  return JSON.stringify(notebook, null, 2);
};