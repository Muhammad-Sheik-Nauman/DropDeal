import FirecrawlApp from "@mendable/firecrawl-js";

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

export async function scrapeProduct(url) {
  try {
    const result = await firecrawl.scrape(url, {
      formats: ["markdown"],
    });

    // Log to see what we're getting
    console.log("Scrape result:", result);

    // Extract with a more detailed prompt
    const extractResult = await firecrawl.extract({
      urls: [url],
      prompt: `Extract the following product information from this e-commerce page:
      - Product name/title
      - Current price (as a number, without currency symbols)
      - Currency code (e.g., USD, EUR, INR)
      - Main product image URL
      
      Return the data in JSON format.`,
      schema: {
        type: "object",
        properties: {
          productName: { 
            type: "string",
            description: "The name or title of the product"
          },
          currentPrice: { 
            type: "number",
            description: "The current price as a number without currency symbols"
          },
          currencyCode: { 
            type: "string",
            description: "The currency code like USD, EUR, INR"
          },
          productImageUrl: { 
            type: "string",
            description: "URL of the main product image"
          },
        },
        required: ["productName", "currentPrice"],
      },
    });

    console.log("Extract result:", extractResult);

    const extractedData = extractResult.data || extractResult;

    if (!extractedData || !extractedData.productName) {
      throw new Error("No data extracted from URL");
    }

    return extractedData;
  } catch (error) {
    console.error("Firecrawl scrape error:", error);
    throw new Error(`Failed to scrape product: ${error.message}`);
  }
}