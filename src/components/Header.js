import React from "react";

export default function Header({ title, purpose }) {
  return (
    <span className="tooltip">
      <span className="title tooltip__initiator">{title}</span>
      <div className="tooltip__item">{purpose}</div>
    </span>
  );
}
