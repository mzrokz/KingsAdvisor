const attachMutationObserver = () => {
  const moveListContainer = document.querySelector('.vertical-move-list');

  // Callback function to execute when mutations are observed
  const callback = (mutationList, observer) => {
    const fen = genFenScript();
    onMoveListMutation(fen);
  };
  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(moveListContainer, {
    attributes: true,
    childList: true,
    subtree: true,
  });
};
