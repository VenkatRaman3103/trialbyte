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

// Favorite Queries Modal Component
export const FavoriteQueriesModal = ({
    favorites,
    onLoadQuery,
    onDeleteQuery,
    onToggleFavorite,
}) => {
    if (!favorites || favorites.length === 0) {
        return (
            <div className="empty-state">
                <p>No favorite queries found.</p>
                <p>Mark queries as favorites to see them here!</p>
            </div>
        );
    }

    return (
        <div className="favorite-queries-list">
            {favorites.map((query) => (
                <div key={query.id} className="favorite-query-item">
                    <div className="query-info">
                        <div className="query-header">
                            <h4>{query.name}</h4>
                            <div className="query-actions">
                                <button
                                    onClick={() => onToggleFavorite(query.id)}
                                    className="favorite-btn active"
                                    title="Remove from favorites"
                                >
                                    <FaStar />
                                </button>
                                <button
                                    onClick={() => onDeleteQuery(query.id)}
                                    className="delete-btn"
                                    title="Delete query"
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        </div>
                        {query.description && (
                            <p className="query-description">
                                {query.description}
                            </p>
                        )}
                        <div className="query-meta">
                            <span>Used {query.usageCount || 0} times</span>
                            {query.lastUsedAt && (
                                <span>
                                    Last used:{" "}
                                    {new Date(
                                        query.lastUsedAt,
                                    ).toLocaleDateString()}
                                </span>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={() => onLoadQuery(query)}
                        className="load-query-btn"
                    >
                        Load Query
                    </button>
                </div>
            ))}
        </div>
    );
};
