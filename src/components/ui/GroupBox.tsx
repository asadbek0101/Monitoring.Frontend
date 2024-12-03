import "./assets/box-group.scss";

import cx from "classnames";
import React, { ReactNode, useMemo } from "react";

import { useI18n } from "../../i18n/I18nContext";
import { I18nCode } from "../../i18n/I18nSchema";

interface Props {
  readonly title?: I18nCode | string;

  readonly children: ReactNode;

  readonly className?: string;
  readonly contentClassName?: string;
}

export function GroupBox({ title, className, children, contentClassName }: Props) {
  const { translate } = useI18n();

  const titleText = useMemo(() => {
    if (title) {
      return translate(title);
    }
  }, [title, translate]);

  return (
    <div className={cx("position-relative p-4 box-group", className)}>
      {Boolean(titleText) && (
        <div className="group-title-wrapper">
          <span className="px-2 bg-white fs-5 group-title">{titleText?.toUpperCase()}</span>
        </div>
      )}

      <div className={`${contentClassName} group-box-body`}>{children}</div>
    </div>
  );
}
