const autoResizeTexarea = (element) => {
  element.style.height = "inherit";
  element.style.height = `${element.scrollHeight}px`;
};

export default autoResizeTexarea;
