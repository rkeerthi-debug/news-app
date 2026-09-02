import { useEffect, useState } from "react";
import {ITEMS_PER_PAGE,type PaginationProps,
} from "../constants/pagination";

function Pagination({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
}: PaginationProps) {
  const [sliderPage, setSliderPage] = useState(currentPage);

  // Keep slider synchronized when page changes
  // through Previous / Next or another action.
  useEffect(() => {
    setSliderPage(currentPage);
  }, [currentPage]);

  // Update only the slider while dragging.
  // Do not load news here.
  const handleSliderChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSliderPage(Number(event.target.value));
  };

  // Load the selected page only after dragging is finished.
  const handleSliderCommit = () => {
    if (sliderPage !== currentPage) {
      onPageChange(sliderPage);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Calculate the item range shown on the selected page.
  const firstItem =
    (sliderPage - 1) * ITEMS_PER_PAGE + 1;

  const lastItem = Math.min(
    sliderPage * ITEMS_PER_PAGE,
    totalItems
  );

  return (
    <nav
      className="pagination"
      aria-label="News pagination"
    >
      {/* Previous button */}
      <button
        type="button"
        className="pagination__arrow"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        ← Previous
      </button>

      {/* Pagination slider */}
      <div className="pagination__scrubber">
        <div className="pagination__info">
          <span>
            Page <strong>{sliderPage}</strong> of{" "}
            <strong>{totalPages}</strong>
          </span>

          <span className="pagination__range">
            {firstItem}–{lastItem}
          </span>
        </div>

        <input
          type="range"
          min={1}
          max={totalPages}
          step={1}
          value={sliderPage}
          onChange={handleSliderChange}
          onMouseUp={handleSliderCommit}
          onTouchEnd={handleSliderCommit}
          onKeyUp={handleSliderCommit}
          className="pagination__slider"
          aria-label="Select news page"
          aria-valuemin={1}
          aria-valuemax={totalPages}
          aria-valuenow={sliderPage}
          aria-valuetext={`Page ${sliderPage} of ${totalPages}`}
        />

        <div className="pagination__labels">
          <span>1</span>
          <span>{totalPages}</span>
        </div>
      </div>

      {/* Next button */}
      <button
        type="button"
        className="pagination__arrow"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        Next →
      </button>
    </nav>
  );
}

export default Pagination;