import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { Button } from "@mui/material";

import axios from "axios";
import XMLParser from "react-xml-parser";

const refreshTime = parseInt(process.env.REACT_APP_BUS_REFRESH_INTERVAL, 10);

const targetStop = {
  name: "중앙시장",
  stationId: ["204000052", "204000073"],
};

const testData = [
  {
    routeName: "9",
    locationNo1: "2",
    locationNo2: "5",
    predictTime1: "4",
    predictTime2: "10",
  },
  {
    routeName: "32-1",
    locationNo1: "3",
    locationNo2: "5",
    predictTime1: "10",
    predictTime2: "22",
  },
  {
    routeName: "320",
    locationNo1: "1",
    locationNo2: "",
    predictTime1: "2",
    predictTime2: "",
  },
  {
    routeName: "88",
    locationNo1: "",
    locationNo2: "",
    predictTime1: "",
    predictTime2: "",
  },
];

const Bus = () => {
  const [busInfo, setBusInfo] = useState([]);

  const requestData = async () => {
    let parsedData = [];
    // // 유사 정류장 ID 순회하면서 버스 정보 수집
    if (process.env.REACT_APP_ENV === "production") {
      console.log("[Env: Production]");
      for (let i = 0; i < targetStop.stationId.length; i += 1) {
        const fetchedData = await getStationData(targetStop.stationId[i]);
        parsedData = [...parsedData, ...parseData(fetchedData)];
      }
    } else {
      console.log("[Env: Development]");
      // test
      parsedData = testData;
    }
    console.log("parsedData", parsedData);
    // 도착정보 없는 데이터 필터
    const filteredData = await filterData(parsedData);
    const sortedData = sortData(filteredData);
    setBusInfo(sortedData);
  };

  useEffect(() => {
    requestData();
    const interval = setInterval(() => requestData(), refreshTime);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const sortData = (data) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      // 오름차순으로 정렬, 필드에 따라 수정 가능
      if (parseInt(a.predictTime1, 10) < parseInt(b.predictTime1, 10))
        return -1;
      if (parseInt(a.predictTime1, 10) > parseInt(b.predictTime1, 10)) return 1;
      return 0;
    });
    return sortedData;
  };

  const filterData = (data) => {
    return data.filter((item) => item.locationNo1 || item.locationNo2);
  };

  const parseData = (data) => {
    const res = [];
    const buses = data.children[2].children;

    for (let i = 0; i < buses.length; i += 1) {
      const bus = buses[i];
      res.push({
        routeName: bus.children[31].value,
        locationNo1: bus.children[16].value,
        locationNo2: bus.children[17].value,
        predictTime1: bus.children[24].value,
        predictTime2: bus.children[25].value,
      });
    }
    return res;
  };

  const getStationData = async (stationId) => {
    const queryParams = new URLSearchParams({
      serviceKey: process.env.REACT_APP_BUS_API_KEY,
      stationId: stationId,
    });

    const response = await axios.get(
      `${process.env.REACT_APP_BUS_API_URL}?${queryParams}`
    );
    const xmlRes = response.data;
    const resJson = new XMLParser().parseFromString(xmlRes);
    // console.log("resJson from XML response:", resJson);
    return resJson;
  };

  return (
    <Box>
      <Typography variant="h5" component="span" sx={{ fontSize: "25px" }}>
        Bus Info
      </Typography>
      <Box component="span" sx={{ marginLeft: 3 }}>
        <Countdown date={Date.now() + refreshTime} style=""></Countdown>
      </Box>
      <Typography variant="h5" sx={{ marginTop: 1 }}>
        정류장: {targetStop.name}
      </Typography>
      <Button onClick={requestData}>Refresh</Button>

      {busInfo.length ? (
        busInfo.map((busData, index) => (
          <Card
            sx={{ display: "flex", bgcolor: "#F7D278", marginTop: 1 }}
            key={index}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginX: "5px",
                height: "40px",
              }}
            >
              <Typography variant="h5" component="div">
                {busData.routeName}
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", height: "40px" }}
            >
              <Box
                sx={{
                  flex: "1 0 auto",
                  marginLeft: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {busData.locationNo1 ? (
                  <>
                    <Typography variant="subtitle1" color="text.secondary">
                      {busData.predictTime1}분
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      ({busData.locationNo1}전)
                    </Typography>
                  </>
                ) : null}
                {busData.locationNo2 ? (
                  <>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      marginLeft={1}
                    >
                      {busData.predictTime2}분
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      ({busData.locationNo2}전)
                    </Typography>
                  </>
                ) : null}
              </Box>
            </Box>
          </Card>
        ))
      ) : (
        <Typography>현재 도착 예정인 버스가 조회되지 않습니다.</Typography>
      )}
    </Box>
  );
};

export default Bus;
