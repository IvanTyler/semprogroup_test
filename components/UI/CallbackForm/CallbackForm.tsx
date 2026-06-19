"use client";

import { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IMaskInput } from "react-imask";
import { clsx } from "clsx";
import { FloatingField } from "@/components/UI/FloatingField/FloatingField";
import styles from "./CallbackForm.module.scss";

const schema = z.object({
    name: z.string().min(2, "Введите ваше имя"),
    phone: z.string().min(18, "Введите корректный номер"),
    email: z.string().email("Введите корректный email"),
});

type FormData = z.infer<typeof schema>;

export const CallbackForm: FC = () => {
    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: { name: "", phone: "", email: "" },
    });

    const watchName = watch("name");
    const watchPhone = watch("phone");
    const watchEmail = watch("email");

    const onSubmit = (data: FormData) => {
        console.log(data);
        reset();
    };

    return (
        <form className={styles.callbackForm} onSubmit={handleSubmit(onSubmit)} noValidate>
            <h2 className={styles.callbackForm__title}>Заказать звонок</h2>

            <div className={styles.callbackForm__body}>
                <div className={styles.callbackForm__fields}>
                    <FloatingField
                        label="Ваше имя"
                        error={errors.name?.message}
                        hasValue={!!watchName}
                    >
                        {() => (
                            <input
                                {...register("name")}
                                className={clsx(styles.field__input, errors.name && styles["field__input--error"])}
                                autoComplete="name"
                            />
                        )}
                    </FloatingField>

                    <FloatingField
                        label="Телефон"
                        error={errors.phone?.message}
                        hasValue={!!watchPhone && watchPhone.length > 4}
                    >
                        {() => (
                            <Controller
                                name="phone"
                                control={control}
                                render={({ field: { onChange, value, ref } }) => (
                                    <IMaskInput
                                        mask="+7 (000) 000-00-00"
                                        value={value}
                                        inputRef={ref}
                                        onAccept={(val: string) => onChange(val)}
                                        className={clsx(styles.field__input, errors.phone && styles["field__input--error"])}
                                        autoComplete="tel"
                                    />
                                )}
                            />
                        )}
                    </FloatingField>

                    <FloatingField
                        label="E-mail"
                        error={errors.email?.message}
                        hasValue={!!watchEmail}
                    >
                        {() => (
                            <input
                                {...register("email")}
                                type="email"
                                className={clsx(styles.field__input, errors.email && styles["field__input--error"])}
                                autoComplete="email"
                            />
                        )}
                    </FloatingField>
                </div>

                <div className={styles.callbackForm__bottom}>
                    <p className={styles.callbackForm__disclaimer}>
                        Нажимая на кнопку «Отправить», вы ознакомлены
                        <br className={styles.callbackForm__disclaimerBr} />
                        {" "}и подтверждаете согласие с{" "}
                        <a href="#">политикой обработки персональных данных</a>
                    </p>
                    <button type="submit" className={styles.callbackForm__submit}>
                        Отправить
                    </button>
                </div>
            </div>
        </form>
    );
};
