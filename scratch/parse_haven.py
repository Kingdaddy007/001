import re

path = r"C:\Users\godsw\.gemini\antigravity\brain\4f16e69a-48e6-4122-b881-f53a002d891b\.system_generated\steps\430\content.md"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Let's clean the HTML tags and scripts
# We want to extract text inside tag elements, or clean standard tags
text = content

# Strip out inline images like src="data:image..."
text = re.sub(r'src="data:image/[^"]+"', 'src="[base64-image]"', text)
text = re.sub(r'background-image:url\(&quot;data:image/[^&]+&quot;\)', 'background-image:url([base64-image])', text)
text = re.sub(r'imageSrcSet="[^"]+"', 'imageSrcSet="[srcset]"', text)
text = re.sub(r'srcSet="[^"]+"', 'srcSet="[srcset]"', text)

# Let's clean HTML tag tags to make text content readable
# Extract readable sentences, tags, and structure
# Remove long script tags
text = re.sub(r'<script.*?>.*?</script>', '', text, flags=re.DOTALL)
text = re.sub(r'<style.*?>.*?</style>', '', text, flags=re.DOTALL)

# Let's save a cleaned version of the file
cleaned_path = r"c:\Users\godsw\ANTIGRAVITY  WORKSPACE\001\scratch\cleaned_haven.txt"
with open(cleaned_path, "w", encoding="utf-8") as f:
    f.write(text)

print("Cleaned file saved. Let's print the first 1500 characters of text:")
# Strip HTML tags to get pure text
pure_text = re.sub(r'<[^>]+>', ' ', text)
# Collapse whitespace
pure_text = re.sub(r'\s+', ' ', pure_text)
print(pure_text[:2000])
