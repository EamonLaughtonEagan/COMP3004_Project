import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

import common from "../config/common";

export function getReportStatusText(status_id) {
    switch (status_id) {
        case 1: {
            return "Completed";
        }
        case 2: {
            return "Minor problem";
        }
        case 3: {
            return "Major problem";
        }
        default: {
            return "Nothing to report";
        }
    }
}

/**
 * Search a job object for the report with the worst (most severe) status_id
 * @param jobObject The root job object to search (jobObject.job must exist)
 * @returns {null|*} The report object with the worst status_id, or null if reports are empty
 */

export function getWorstReport(jobObject) {
    if (jobObject.job.reports.length === 0) {
        return null;
    }

    let worstReport = jobObject.job.reports[0];
    jobObject.job.reports.forEach((report) => {
        if (report.status_id > worstReport) {
            worstReport = report;
        }
    });

    return worstReport;
}

export function getReportColor(report) {
    let iconColor;

    if (report === null) {
        return common.secondary;
    } else if (report.status_id === 1) {
        iconColor = "green";
    } else if (report.status_id === 2) {
        iconColor = common.secondary;
    } else if (report.status_id === 3) {
        iconColor = "firebrick";
    }

    return iconColor;
}

export function getReportIconName(report) {
    let iconName;

    if (report === null) {
        iconName = "clock-outline";
    } else if (report.status_id === 1) {
        iconName = "check-bold";
    } else if (report.status_id === 2) {
        iconName = "alert-box-outline";
    } else if (report.status_id === 3) {
        iconName = "alert-box-outline";
    }

    return iconName;
}

/**
 * Choose an icon based on a report's status_id
 * @param report The report (null safe)
 * @param iconStyle Icon style override
 * @param iconSize  Icon size override
 * @returns {string}   A MaterialCommunityIcon
 */
export function createReportIcon(
    report,
    iconStyle = { flexDirection: "column", alignSelf: "center", margin: 5 },
    iconSize = 24
) {
    const iconName = getReportIconName(report);
    const iconColor = getReportColor(report);

    return (
        <MaterialCommunityIcons
            name={iconName}
            size={iconSize}
            color={iconColor}
            style={iconStyle}
        />
    );
}

let date = null;

/**
 * Format ISO Date string into HH:MM format
 * @param dateTimeStr Date/time string
 * @returns {string} HH:MM string
 */
export function timeMinHour(dateTimeStr) {
    date = new Date(dateTimeStr);
    let suffix = "AM";
    let hours = date.getHours();

    if (hours > 11) {
        suffix = "PM";
    }

    hours = hours % 12;

    if (hours % 12 === 0) {
        hours = 12;
    }

    const pad = "0" + date.getMinutes();
    const minutes = pad.substr(pad.length - 2);
    return hours + ":" + minutes + suffix;
}

/**
 * Format milliseconds into short time form (relative). Examples:
 * - 3h 23m ago
 * - in 2d 3h
 * - now
 * - in 3mo 2w
 * @param ms The timeframe to convert, in milliseconds
 * @returns {string} in short time format (relative)
 */
export function timeDiffShortRelative(ms) {
    if (Math.abs(ms) < common.MILLIS_MIN * 5) {
        return "now";
    }

    const str = timeDiffShort(ms);

    if (ms < 0) {
        return str + " ago";
    } else {
        return "in " + str;
    }
}

/**
 * Format milliseconds into short time form. Examples:
 * - 3h 23m
 * - 4d
 * - 3w 2d
 * - 3mo 2w
 * @param ms The timeframe to convert, in milliseconds
 * @returns {string} in short time format
 */
export function timeDiffShort(ms) {
    ms = Math.abs(ms);
    if (ms < 30000) {
        return "now";
    } else {
        let str = "";
        const months = Math.floor(ms / common.MILLIS_MONTH);
        if (months >= 1) {
            str += months + "mo ";
            ms = ms % common.MILLIS_MONTH;
        }

        const weeks = Math.floor(ms / common.MILLIS_WEEK);
        if (weeks >= 1) {
            str += weeks + "w ";
            ms = ms % common.MILLIS_WEEK;
        }

        if (weeks > 0 || months > 0) {
            return str.trim();
        }

        const days = Math.floor(ms / common.MILLIS_DAY);
        if (days >= 1) {
            str += days + "d ";
            return str.trim();
        }

        const hours = Math.floor(ms / common.MILLIS_HOUR);
        if (hours >= 1) {
            str += hours + "h ";
            ms = ms % common.MILLIS_HOUR;
        }

        const mins = Math.floor(ms / common.MILLIS_MIN);
        if (mins >= 1) {
            str += mins + "m ";
        }

        return str.trim();
    }
}

export function timeShortRelativeNow(str) {
    const date = new Date(str);
    const now = new Date();
    const diff = date - now;

    return timeDiffShortRelative(diff);
}
