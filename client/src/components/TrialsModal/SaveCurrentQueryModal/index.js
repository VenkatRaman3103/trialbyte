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

export const SaveCurrentQueryModal = ({
    queryName,
    setQueryName,
    queryDescription,
    setQueryDescription,
    onSave,
    isLoading,
    currentQuery,
    onClose,
}) => {
    return (
        <div className="save-query-modal">
            <div className="save-query-form">
                <div className="form-group">
                    <label htmlFor="queryName" className="form-label">
                        Enter the query Title<span className="required">*</span>
                    </label>
                    <input
                        id="queryName"
                        type="text"
                        value={queryName}
                        onChange={(e) => setQueryName(e.target.value)}
                        placeholder="Enter query title..."
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="queryDescription" className="form-label">
                        Description (optional)
                    </label>
                    <textarea
                        id="queryDescription"
                        value={queryDescription}
                        onChange={(e) => setQueryDescription(e.target.value)}
                        placeholder="Enter description..."
                        className="form-textarea"
                        rows={4}
                    />
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="action-btn alert-btn"
                        onClick={() => {
                            // Handle get alert functionality
                            console.log("Get Alert clicked");
                        }}
                    >
                        Get Alert
                    </button>
                    <button
                        type="button"
                        className="action-btn save-btn"
                        onClick={onSave}
                        disabled={!queryName.trim() || isLoading}
                    >
                        {isLoading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
};
