import React from "react";
import "./assets/info-title.scss";
import { useI18n } from "../../i18n/I18nContext";

export enum InformationBody {
  InformationBodyTitle_1 = "INFORMATION_TITLE_1",
  InformationBodyTitle_2 = "INFORMATION_TITLE_2",
  InformationBodyTitle_3 = "INFORMATION_TITLE_3",
  InformationBodyTitle_4 = "INFORMATION_TITLE_4",
  InformationBodyTitle_5 = "INFORMATION_TITLE_5",
  InformationBodyTitle_6 = "INFORMATION_TITLE_6",
  NoInfo = "",
}

interface Props {
  readonly infoTitle: InformationBody;
  readonly table?: boolean;
}
function InfoTitle({ infoTitle, table }: Props) {
  const { translate } = useI18n();
  return (
    <>
      {!table ? (
        <div className="p-4  bg-white position-absolute border border-blue-light info-for-user text-blue-light">
          <span>{translate(infoTitle)}</span>
        </div>
      ) : (
        <div className="d-flex">
          <table
            className="table text-center position-absolute bg-white border border-blue-light info-for-user-table text-blue-light"
            style={{ marginRight: "80px" }}
          >
            <tr>
              <td className="infoTd">RUS</td>
              <td className="infoTd font-weight-bold eng-color">ENG</td>
            </tr>
            <tr>
              <td className="infoTd">A</td>
              <td className="infoTd font-weight-bold eng-color">A</td>
            </tr>
            <tr>
              <td className="infoTd">Б</td>
              <td className="infoTd font-weight-bold eng-color">B</td>
            </tr>
            <tr>
              <td className="infoTd">В</td>
              <td className="infoTd font-weight-bold eng-color">V</td>
            </tr>
            <tr>
              <td className="infoTd">Г</td>
              <td className="infoTd font-weight-bold eng-color">G</td>
            </tr>
            <tr>
              <td className="infoTd">Д</td>
              <td className="infoTd font-weight-bold eng-color">D</td>
            </tr>
            <tr>
              <td className="infoTd">Е</td>
              <td className="infoTd font-weight-bold eng-color">E</td>
            </tr>
            <tr>
              <td className="infoTd">Ё</td>
              <td className="infoTd font-weight-bold eng-color">O</td>
            </tr>
            <tr>
              <td className="infoTd">Ж</td>
              <td className="infoTd font-weight-bold eng-color">J</td>
            </tr>
            <tr>
              <td className="infoTd">З</td>
              <td className="infoTd font-weight-bold eng-color">Z</td>
            </tr>
            <tr>
              <td className="infoTd">И</td>
              <td className="infoTd font-weight-bold eng-color">I</td>
            </tr>
            <tr>
              <td className="infoTd">Й</td>
              <td className="infoTd font-weight-bold eng-color">I</td>
            </tr>
            <tr>
              <td className="infoTd">К</td>
              <td className="infoTd font-weight-bold eng-color">K</td>
            </tr>
            <tr>
              <td className="infoTd">Л</td>
              <td className="infoTd font-weight-bold eng-color">L</td>
            </tr>
            <tr>
              <td className="infoTd">М</td>
              <td className="infoTd font-weight-bold eng-color">M</td>
            </tr>
            <tr>
              <td className="infoTd">Н</td>
              <td className="infoTd font-weight-bold eng-color">N</td>
            </tr>
            <tr>
              <td className="infoTd">О</td>
              <td className="infoTd font-weight-bold eng-color">O</td>
            </tr>
            <tr>
              <td className="infoTd">П</td>
              <td className="infoTd font-weight-bold eng-color">P</td>
            </tr>
          </table>
          <table className="table text-center position-absolute bg-white border border-blue-light info-for-user-table text-blue-light">
            <tr>
              <td className="infoTd">RUS</td>
              <td className="infoTd font-weight-bold eng-color">ENG</td>
            </tr>
            <tr>
              <td className="infoTd">Р</td>
              <td className="infoTd font-weight-bold eng-color">R</td>
            </tr>
            <tr>
              <td className="infoTd">С</td>
              <td className="infoTd font-weight-bold eng-color">S</td>
            </tr>
            <tr>
              <td className="infoTd">Т</td>
              <td className="infoTd font-weight-bold eng-color">T</td>
            </tr>
            <tr>
              <td className="infoTd">У</td>
              <td className="infoTd font-weight-bold eng-color">U</td>
            </tr>
            <tr>
              <td className="infoTd">Ф</td>
              <td className="infoTd font-weight-bold eng-color">F</td>
            </tr>
            <tr>
              <td className="infoTd">Х</td>
              <td className="infoTd font-weight-bold eng-color">H</td>
            </tr>
            <tr>
              <td className="infoTd">Ц</td>
              <td className="infoTd font-weight-bold eng-color">C</td>
            </tr>
            <tr>
              <td className="infoTd">Ч</td>
              <td className="infoTd font-weight-bold eng-color">C</td>
            </tr>
            <tr>
              <td className="infoTd">Ш</td>
              <td className="infoTd font-weight-bold eng-color">Q</td>
            </tr>
            <tr>
              <td className="infoTd">Щ</td>
              <td className="infoTd font-weight-bold eng-color">Q</td>
            </tr>
            <tr>
              <td className="infoTd">Ъ</td>
              <td className="infoTd font-weight-bold eng-color">X</td>
            </tr>
            <tr>
              <td className="infoTd">Ы</td>
              <td className="infoTd font-weight-bold eng-color">Y</td>
            </tr>
            <tr>
              <td className="infoTd">Ь</td>
              <td className="infoTd font-weight-bold eng-color">X</td>
            </tr>
            <tr>
              <td className="infoTd">Э</td>
              <td className="infoTd font-weight-bold eng-color">E</td>
            </tr>
            <tr>
              <td className="infoTd">Ю</td>
              <td className="infoTd font-weight-bold eng-color">U</td>
            </tr>
            <tr>
              <td className="infoTd">Я</td>
              <td className="infoTd font-weight-bold eng-color">A</td>
            </tr>
            <tr>
              <td className="infoTd">.</td>
              <td className="infoTd font-weight-bold eng-color">.</td>
            </tr>
          </table>
        </div>
      )}
    </>
  );
}

export default InfoTitle;
