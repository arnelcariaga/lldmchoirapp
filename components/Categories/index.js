import React, { useEffect, useState, useMemo } from "react";
import { FlatList } from "react-native";
import { getCategoriesAction } from "./../Redux/songsDucks";
import { useDispatch, useSelector } from "react-redux";
import CategoriesAccordion from "./Accordion";
import Loading from "./../parts/loading";

export default function Categories({ navigation }) {
  const dispatch = useDispatch();
  const categories = useSelector((store) => store.songsData.categories);
  const [data, setData] = useState([]);
  const searchCategories = useSelector(
    (store) => store.headerData.searchCategories
  );

  useEffect(() => {
    dispatch(getCategoriesAction());
  }, [dispatch]);

  useEffect(() => {
    setData(categories);
  }, [categories]);

  const filteredItems = data.filter((item) => {
    return item.category_name
      .toLowerCase()
      .match(searchCategories.toLowerCase());
  });

  const renderItem = useMemo(
    () =>
      ({ item }) =>
        (
          <CategoriesAccordion
            title={item.category_name}
            songs={item.songs}
            navigation={navigation}
          />
        ),
    []
  );

  const keyExtractor = (item) => item.category_id.toString();

  return (
    <>
      {data.length === 0 ? (
        <Loading />
      ) : (
        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      )}
    </>
  );
}
