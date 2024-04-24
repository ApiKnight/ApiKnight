use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};
use serde_wasm_bindgen::{from_value, to_value};

// 定义数据类型
#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum DataType {
    String,
    Integer,
    Boolean,
    // 根据需要添加更多数据类型
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct SwaggerParameter {
    pub name: Option<String>,
    pub required: Option<bool>,
    pub description: Option<String>,
    pub typ: Option<DataType>,
    pub in_field: Option<String>,
    pub x_example: Option<Vec<String>>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct NormalParamsType {
    pub id: u64,
    pub paramName: Option<String>,
    pub required: Option<bool>,
    pub desc: Option<String>,
    pub typ: Option<DataType>,
    pub value: Option<String>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct RequestParamsType {
    pub params: Vec<NormalParamsType>,
    pub headers: Vec<NormalParamsType>,
    pub cookie: Vec<NormalParamsType>,
    pub body: String,
}

// 实现解析函数
#[wasm_bindgen]
pub fn parse_swagger_parameters(swagger_params: JsValue) -> Result<JsValue, JsValue> {
    let params: Vec<SwaggerParameter> = from_value(swagger_params)?;

    let mut params_info = Vec::new();
    let mut headers_info = Vec::new();
    let mut cookie_info = Vec::new();
    let mut body_info = String::new();

    for param_item in params {
        let single_api_info = NormalParamsType {
            id: get_random_id(),
            paramName: param_item.name.clone(),
            required: param_item.required,
            desc: param_item.description.clone(),
            typ: param_item.typ.clone(),
            value: param_item.x_example.as_ref().and_then(|examples| examples.first().cloned()),
        };

        match param_item.in_field.as_ref().map(String::as_str) {
            Some("query") => params_info.push(single_api_info),
            Some("header") => headers_info.push(single_api_info),
            Some("cookie") => cookie_info.push(single_api_info),
            Some("body") => body_info = "{}".to_string(),
            _ => (),
        }
    }

    let result = RequestParamsType {
        params: params_info,
        headers: headers_info,
        cookie: cookie_info,
        body: body_info,
    };

    Ok(to_value(&result)?)
}

fn get_random_id() -> u64 {
    use rand::Rng;
    let mut rng = rand::thread_rng();
    let timestamp = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .expect("Time went backwards")
        .as_secs();
    rng.gen_range(1000..=9999) + timestamp as u64
}