import { useEffect, useState, forwardRef, useRef } from 'react';
import { vi } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import clsx from 'clsx';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'react-i18next';
import { FaRegCalendar } from 'react-icons/fa6';
import './CustomDatePicker.css';

const months = [
  { label: 'Tháng một', value: 1 },
  { label: 'Tháng hai', value: 2 },
  { label: 'Tháng ba', value: 3 },
  { label: 'Tháng tư', value: 4 },
  { label: 'Tháng năm', value: 5 },
  { label: 'Tháng sáu', value: 6 },
  { label: 'Tháng bảy', value: 7 },
  { label: 'Tháng tám', value: 8 },
  { label: 'Tháng chín', value: 9 },
  { label: 'Tháng mười', value: 10 },
  { label: 'Tháng mười một', value: 11 },
  { label: 'Tháng mười hai', value: 12 },
];

function range(min, max) {
  const len = max - min + 1;
  return Array.from({ length: len }, (_, i) => min + i);
}

const CustomTimeInput = ({ date, onChangeCustom }) => {
  const value = date instanceof Date ? date.toLocaleTimeString('it-IT') : '';
  return (
    <input
      type="time"
      step="1"
      value={value}
      onChange={(event) => onChangeCustom(date, event.target.value)}
    />
  );
};

const CustomDatePicker = ({
  value,
  onChange,
  id,
  invalid,
  invalidText,
  className,
  minDate,
  maxDate,
  format = 'dd/MM/yyyy',
  showMonthYearPicker,
  showYearPicker = false,
  showTimeInput,
  disabled,
  rangeYears = [25, 0],
  isClearable = false,
  locale,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'common' });
  const inputRef = useRef(null);

  const handleChangeTime = (date, time) => {
    const [hh, mm, ss] = time.split(':');
    const targetDate = date instanceof Date ? date : new Date();
    targetDate.setHours(Number(hh) || 0, Number(mm) || 0, Number(ss) || 0);
    onChange(targetDate);
  };

  return (
    <div className={`custom-datepicker w-full relative z-auto ${className}`}>
      <DatePicker
        popperClassName={showYearPicker ? 'year-picker-popout' : 'calendar-popout'}
        dateFormat={format}
        showTimeInput={!!showTimeInput}
        timeInputLabel={t('text.time')}
        showMonthYearPicker={!!showMonthYearPicker}
        showYearPicker={showYearPicker}
        showTwoColumnMonthYearPicker={showMonthYearPicker || showYearPicker}
        className={clsx(
          'w-full h-10 min-h-10 border-small border-default-300 text-default-foreground text-sm rounded-lg hover:border-default-400 focus:border-black focus:outline-none cursor-pointer flex items-center disabled:hover:border-default-300 !px-3 disabled:cursor-auto',
          {
            'border-rose-500': invalid,
            '!bg-white focus:border-default-300 cursor-auto': disabled,
            'bg-white': !disabled && !invalid,
          }
        )}
        selected={value}
        onChange={(date) => {
          if (showYearPicker) {
            onChange(date ? new Date(date.getFullYear(), 0, 1) : null);
          } else {
            onChange(date);
          }
        }}
        customTimeInput={<CustomTimeInput date={value} onChangeCustom={handleChangeTime} />}
        minDate={minDate}
        maxDate={maxDate}
        disabled={!!disabled}
        locale={locale === 'vi' ? vi : locale}
        placeholderText={format?.toLowerCase()}
        showIcon
        icon={<FaRegCalendar className="text-default-foreground" />}
        isClearable={isClearable}
        clearButtonClassName="pr-3"
        onChangeRaw={(e) => e?.preventDefault()}
      />
      <div className="text-danger text-xs whitespace-nowrap absolute top-10 left-0 py-1">
        {invalidText || null}
      </div>
    </div>
  );
};

export default CustomDatePicker;
