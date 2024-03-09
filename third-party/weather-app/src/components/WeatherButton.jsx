import React, { useState } from "react";
import { IoMdSettings } from "react-icons/io";

function WeatherButton({
  cityList,
  activeCity,
  handleCityChange,
  onRemove,
  edit,
  toggleEdit,
}) {
  // 편집버튼 클릭 시 비활성화
  const [disableClick, setDisableClick] = useState(false);
  const [removeActiveClass, setRemoveActiveClass] = useState(false);

  // 편집버튼 클릭 이벤트
  const handleEditClick = () => {
    toggleEdit();
    setDisableClick(!disableClick);
    setRemoveActiveClass(true);
  };

  // 즐겨찾기 클릭 이벤트
  const handleCityClick = (city) => {
    if (!disableClick) {
      handleCityChange(city);
    }
  };

  return (
    <>
      <div className="myList-head">
        <h3>내가 저장한 지역</h3>
        <IoMdSettings className={`btn_edit`} onClick={handleEditClick} />
      </div>
      <div className="myList-body">
        {cityList.map((city) => (
          <div
            key={city}
            onClick={() => handleCityClick(city)}
            className={`myList_inner ${
              activeCity === city && !removeActiveClass ? "active" : ""
            }
            `}
          >
            <button
              key={city}
              className={`myList-btn ${disableClick ? "disabled" : ""}`}
            >
              {city}
            </button>
            {edit && (
              <button className="btn_delete" onClick={() => onRemove(city)}>
                <i className="ico_delete">삭제</i>
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default WeatherButton;
