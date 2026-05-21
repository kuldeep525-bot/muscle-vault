import Plan from "../models/plan.model.js";

export const createPlan = async (req, res) => {
  try {
    const { name, duration, price } = req.body;

    if (!name || !duration || !price) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are compulsary" });
    }

    const planCreated = await Plan.create({
      name,
      duration,
      price,
    });

    return res.status(201).json({
      success: true,
      message: "Plan created Successfully",
      plan: planCreated,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

export const getAllPlan = async (req, res) => {
  try {
    const plans = await Plan.find({ isActive: true });

    if (plans.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Not found any plan" });
    }

    return res.status(200).json({
      success: true,
      message: "Plan found Successfully",
      totalPlans: plans.length,
      plan: plans,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

export const updatePlan = async (req, res) => {
  try {
    const { name, duration, price } = req.body;

    const { id } = req.params;

    const plan = await Plan.findById(id);

    if (!plan) {
      return res
        .status(404)
        .json({ success: false, message: "Plan not found" });
    }

    plan.name = name;
    plan.duration = duration;
    plan.price = price;

    await plan.save();

    return res.status(200).json({
      success: true,
      message: "Plan updated Successfully",
      plan,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

export const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await Plan.findById(id);

    if (!plan) {
      return res
        .status(404)
        .json({ success: false, message: "Plan not found" });
    }

    await Plan.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Plan deleted Successfully",
      plan,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};
