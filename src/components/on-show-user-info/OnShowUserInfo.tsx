import React, { useState } from "react";
import { InfoIcon } from "../icons/infoIcon";

interface Props {
  readonly title: any;
}

export function OnShowUserInfo({ title }: Props) {
  const [show, setShow] = useState(false);
  return (
    <InfoIcon onShowTitle={() => setShow(true)} onHiddenTitle={() => setShow(false)} show={show}>
      {title}
    </InfoIcon>
  );
}
