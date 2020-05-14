export function initHistory(chart) {
  const { canvas, ctx } = chart;
  const history = [];
  let cursor = -1;

  function save() {
    if (++cursor < history.length) {
      history.length = cursor;
    }

    history.push(canvas.toDataURL());
  }

  function undo() {
    if (cursor < 0) return;

    redraw();

    cursor -= 1;
  }

  function redo() {
    if (cursor > history.length - 1) return;

    redraw();

    cursor += 1;
  }

  function redraw() {
    const savedCtx = new Image();
    savedCtx.src = history[cursor];
    savedCtx.onload = () => ctx.drawImage(savedCtx, 0, 0);
  }

  return {
    save,
    undo,
    redo
  };
}
