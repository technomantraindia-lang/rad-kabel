/**
 * Utility to force download the RAD KABEL brochure PDF directly to the user's File Explorer / Downloads folder.
 * Bypasses browser PDF inline viewer.
 */
export async function handleDownloadBrochure(e) {
  if (e && typeof e.preventDefault === "function") {
    e.preventDefault();
  }

  const brochureUrl = "/brochure.pdf";
  const fileName = "RAD_KABEL_BROCHURE.pdf";

  try {
    const response = await fetch(brochureUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);
    }

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    }, 200);
  } catch (error) {
    console.warn("Direct blob download failed, falling back to anchor download:", error);
    const fallbackLink = document.createElement("a");
    fallbackLink.href = brochureUrl;
    fallbackLink.download = fileName;
    fallbackLink.target = "_blank";
    document.body.appendChild(fallbackLink);
    fallbackLink.click();
    setTimeout(() => {
      document.body.removeChild(fallbackLink);
    }, 200);
  }
}
