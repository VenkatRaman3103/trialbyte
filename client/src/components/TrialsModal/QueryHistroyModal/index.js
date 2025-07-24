import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import "./index.scss";
import { ListView } from "@/components/TrialsPreviews/ListView";
import { getAllTrials } from "@/api/trials/getAllTrials";
import {
    getAllSavedQueries,
    createSavedQuery,
    deleteSavedQuery,
    executeSavedQuery,
    toggleFavorite,
    getQueryHistory,
    getFavoriteQueries,
} from "@/api/trials/searchQuery";

import { IoSearch } from "react-icons/io5";
import { FaRegFolder, FaTimes, FaStar, FaRegStar } from "react-icons/fa";
import { RiListCheck } from "react-icons/ri";
import { BsCardText } from "react-icons/bs";
import { TbArrowsSort } from "react-icons/tb";
import { CiSaveDown2 } from "react-icons/ci";
import { GoHistory } from "react-icons/go";
import { CiBookmark } from "react-icons/ci";
import { SlList } from "react-icons/sl";

import { LuArrowLeft } from "react-icons/lu";
import { IoSearchOutline } from "react-icons/io5";
import { IoFilterOutline } from "react-icons/io5";
import { TfiSave } from "react-icons/tfi";
import { LuUpload } from "react-icons/lu";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

import { IoIosArrowDown } from "react-icons/io";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { FaRegSquare } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";
import { FilterModal } from "@/components/TrialsModal/FilterModal";

export const QueryHistoryModal = ({ history, onLoadQuery }) => {
    if (!history || history.length === 0) {
        return (
            <div className="empty-state">
                <p>No query history found.</p>
            </div>
        );
    }

    return (
        <div className="query-history-list">
            {history.map((item) => (
                <div key={item.id} className="history-item">
                    <div className="history-info">
                        <div className="history-header">
                            <h4>{item.queryName || "Ad-hoc Query"}</h4>
                            <span className="history-date">
                                {new Date(item.executedAt).toLocaleString()}
                            </span>
                        </div>
                        <div className="history-details">
                            {item.simpleSearch && (
                                <span className="detail-tag">
                                    Search: "{item.simpleSearch}"
                                </span>
                            )}
                            {item.searchCriteria &&
                                item.searchCriteria.length > 0 && (
                                    <span className="detail-tag">
                                        {item.searchCriteria.length} advanced
                                        criteria
                                    </span>
                                )}
                            <span className="detail-tag">
                                {item.resultsCount} results
                            </span>
                            <span className="detail-tag">
                                {item.executionTime}ms
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={() =>
                            onLoadQuery({
                                simpleSearch: item.simpleSearch,
                                searchCriteria: item.searchCriteria,
                                sortBy: item.sortBy,
                                sortOrder: item.sortOrder,
                            })
                        }
                        className="load-query-btn"
                    >
                        Load Query
                    </button>
                </div>
            ))}
        </div>
    );
};
