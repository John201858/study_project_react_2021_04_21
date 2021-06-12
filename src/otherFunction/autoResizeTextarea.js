const autoResizeTexarea = (event) => {
  event.target.style.height = "inherit";
  event.target.style.height = `${event.target.scrollHeight}px`;
};

export default autoResizeTexarea;
