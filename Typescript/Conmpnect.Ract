interface RowFocusHandlers {
  /**
   * This function will be called when a row obtains focus, no matter how.
   */
  readonly onRowFocus?: (
    indexPath: RowIndexPath,
    source: React.FocusEvent<HTMLDivElement>
  ) => void;

  /**
   * This function will be called only when a row obtains focus via keyboard.
   */
  readonly onRowKeyboardFocus?: (
    indexPath: RowIndexPath,
    e: React.KeyboardEvent<any>
  ) => void;

  /**
   * This function will be called when a row loses focus.
   */
  readonly onRowBlur?: (
    indexPath: RowIndexPath,
    source: React.FocusEvent<HTMLDivElement>
  ) => void;
}
