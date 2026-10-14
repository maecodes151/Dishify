const readIds = (key) => {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value.map(String) : [];
  } catch (error) {
    console.error(`Could not read ${key} from local storage:`, error);
    return [];
  }
};

export const readSavedIds = () => readIds("dishify:saved");
export const readLikedIds = () => readIds("dishify:liked");

export const writeIds = (key, ids) => {
  try {
    localStorage.setItem(key, JSON.stringify(ids));
  } catch (error) {
    console.error(`Could not save ${key} to local storage:`, error);
  }
};

export const readComments = (foodId) => {
  try {
    const value = JSON.parse(
      localStorage.getItem(`dishify:comments:${foodId}`) || "[]",
    );
    return Array.isArray(value) ? value : [];
  } catch (error) {
    console.error("Could not read comments from local storage:", error);
    return [];
  }
};

export const writeComments = (foodId, comments) => {
  try {
    localStorage.setItem(
      `dishify:comments:${foodId}`,
      JSON.stringify(comments),
    );
  } catch (error) {
    console.error("Could not save comments to local storage:", error);
  }
};
