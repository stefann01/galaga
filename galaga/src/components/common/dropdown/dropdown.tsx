import React, { useEffect, useRef, useState } from "react";
import styles from "./dropdown.module.scss";
import ArrowDown from "../../../assets/icons/arrow_down.svg";

interface DropdownProps {
  items: string[];
  onItemClick: (value: string) => void;
  selectedItem: React.ReactNode;
}

export default function Dropdown({
  items,
  onItemClick,
  selectedItem,
}: DropdownProps) {
  const [isListVisible, setIsListVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsListVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <>
      <div
        className={styles.dropdown}
        onClick={() => setIsListVisible(!isListVisible)}
        ref={wrapperRef}
      >
        <div className={styles.dropdownSelected}>
          <span className={styles.selectedItem}>{selectedItem}</span>
          <img src={ArrowDown} alt="candy" className={styles.arrowDown} />
        </div>
        {isListVisible && (
          <div className={styles.dropdownList}>
            {items.map((item, index) => {
              return (
                <>
                  <div
                    className={styles.dropdownItem}
                    onClick={() => {
                      onItemClick(item);
                      setIsListVisible(false);
                    }}
                  >
                    {item}
                  </div>
                  {index < items.length - 1 && (
                    <hr className={styles.divider} />
                  )}
                </>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
